const stravaApi = require('./stravaApi.js');
const { dbQuery, insert, update, getCols } = require('../db.js');
const _ = require('lodash');
const { convertToUserUnits} = require('./convertUnits.js');

const login = {
  get: async (req, res) => {

    let { access_token, id } = req.body.permissions;
    let userDataset = await getUserWithBikesWithParts(id); // db query
    let { last_login_date } = userDataset;

    let athleteDataPromise = stravaApi.get.infoWithBikes(access_token); // athlete data from strava
    let usageSinceLastLoginPromise = stravaApi.get.calcUsageSinceDate(access_token, last_login_date); // calculate distance and time since last login per bike
   
    let [{ data: athleteData }, usageSinceLastLogin] = await Promise.all([athleteDataPromise, usageSinceLastLoginPromise]);

    // arrays of bike id's
    let dbActiveBikeIds = userDataset.bikes.reduce((totArr, bikeObj) => { // db - active bikes in db
      if (bikeObj.b_status === 'active') { return [...totArr, bikeObj.bike_id]; }
      else { return [...totArr] };
    }, []);
    let dbRetiredBikeIds = _.difference(userDataset.bikes.map(el => el.bike_id), dbActiveBikeIds);

    let athleteDataBikeIds = athleteData.bikes.map(bike => bike.id); // strava - active bikes
    let activityLogBikeIds = Object.keys(usageSinceLastLogin); // strava - active and retired
    let zeroActivityBikeIds = !last_login_date ? _.difference(athleteDataBikeIds, activityLogBikeIds) : []; // bikes without activity (needed for first logins)
    let retiredViaStravaIds = _.difference(dbActiveBikeIds, athleteDataBikeIds);
    let takenOutOfRetirementViaStravaIds = _.intersection(dbRetiredBikeIds, athleteDataBikeIds);
    let dbPromises = [];
    

    // ... UPDATE DB ...
    let bikesToAddOrUpdate = [...activityLogBikeIds, ...zeroActivityBikeIds, ...retiredViaStravaIds, ...takenOutOfRetirementViaStravaIds];

    for (bikeId of bikesToAddOrUpdate) {
      // NOT in dbBikesActive && in athleteDataBikes => new bike
      if (!dbActiveBikeIds.includes(bikeId) && athleteDataBikeIds.includes(bikeId)) {
        // insert as 'active'
        let newBike = formatNewBike( athleteData.bikes.find(el => el.id === bikeId), usageSinceLastLogin[bikeId] );
        dbPromises.push( insert('bikes', { ...newBike, strava_id: id }) );
      }

      // in dbBikesActive && NOT in athleteDataBikes => bike was retired
      if ( (dbActiveBikeIds.includes(bikeId) && !athleteDataBikeIds.includes(bikeId)) || retiredViaStravaIds.includes(bikeId) ) {
        // user retired bike since last login
        let bikeToUpdate = userDataset.bikes.find(el => el.bike_id === bikeId);
        dbPromises.push( updateBikeAndParts(bikeToUpdate, usageSinceLastLogin[bikeId], 'retired') );
      }

      // (in dbBikesActive && in athleteDataBikes) OR taken out of retirement via strava
      if ( (dbActiveBikeIds.includes(bikeId) && athleteDataBikeIds.includes(bikeId)) || takenOutOfRetirementViaStravaIds.includes(bikeId) ) {
        // update bike and parts useage
        let bikeToUpdate = userDataset.bikes.find(el => el.bike_id === bikeId);
        dbPromises.push( updateBikeAndParts(bikeToUpdate, usageSinceLastLogin[bikeId], 'active') );
      }

      // NOT in dbBikesActive && NOT in athleteDataBikes
      if (!dbActiveBikeIds.includes(bikeId) && !athleteDataBikeIds.includes(bikeId)) {
        // user added and retired bike since last login wihout riing it - ask user if they want to import
      }
    }

    // update user_info w/ last_login_date
    dbPromises.push( update('user_info', { whereVar: { id }, updateVars: {last_login_date: Date.now()} }) );

    await Promise.all(dbPromises);

    // get all updated user data
    let updatedDataset = await getUserWithBikesWithParts(id);
    updatedDataset.measure_pref = athleteData.measurement_preference === 'feet' ? 'mi' : 'km';

    updatedDataset.last_login_date = last_login_date;
    updatedDataset = convertToUserUnits(updatedDataset);
    console.log('updatedDataset post-convert: ', updatedDataset)
    res.send(updatedDataset);

  }
};

// user info with bikes with parts from db
const getUserWithBikesWithParts = async (stravaId) => {

  let queryText = `SELECT * FROM user_info LEFT JOIN ` +
    `(SELECT * FROM bikes LEFT JOIN parts ON bikes.bike_id=parts.p_bike_id WHERE bikes.strava_id=${stravaId}) b ` +
    `ON user_info.id=b.strava_id WHERE user_info.id=${stravaId}`

  // let queryText = 'select * from bikes';

  let [rawData, userInfoCols, bikeCols, partCols] = await Promise.all([
      dbQuery(queryText),
      getCols('user_info'),
      getCols('bikes'), getCols('parts')
    ]);

  // format rawData
  let formattedData = _.pick(rawData[0], userInfoCols);

  let bikesWithParts = [];
  let uniqBikeIdElements = _.uniqBy(rawData, 'bike_id');
  for (let uniqEl of uniqBikeIdElements) {
    if (uniqEl.bike_id === null) break;
    let bikeObj = _.pick(uniqEl, bikeCols);
    delete bikeObj.strava_id;
    bikeObj.parts = [];
    let partCollection = _.filter(rawData, _.matches({ 'p_bike_id': uniqEl.bike_id }));
    partCollection.forEach(partEl => {
      delete partEl.p_bike_id;
      // calc wear
      let wear = {};
      
      bikeObj.parts.push(_.pick(partEl, partCols));
    });
    bikesWithParts.push(bikeObj);
  }
  formattedData.bikes = bikesWithParts;

  return formattedData;
};

// format bike to be added to db
const formatNewBike = (newBike, latestUse, status='active') => {

  newBike.bike_id = newBike.id
  newBike.b_status = status;
  newBike.b_dist_current = latestUse ? latestUse.distSinceDate : 0;
  newBike.b_dist_at_add = newBike.b_dist_current;
  newBike.b_time_current = latestUse ? latestUse.timeSinceDate : 0;
  newBike.b_time_at_add = newBike.b_time_current;
  newBike.b_date_added = Date.now();

  (['primary', 'resource_state' , 'id' , 'distance' ]).forEach(el => delete newBike[el]);
  
  return newBike;
};


// update bike and parts in db
const updateBikeAndParts = async (bikeToUpdate, latestUse, status) => {
  let promises = [];

  let distIncrement = latestUse ? latestUse.distSinceDate : 0;
  let timeIncrement = latestUse ? latestUse.timeSinceDate : 0;
  
  // update parts
  let parts = bikeToUpdate.parts;
  parts.forEach(part => {
    let partId = part.part_id
    let updatePartDist = `UPDATE parts SET p_dist_current=p_dist_current+${distIncrement}, p_status='${status}' WHERE part_id=${partId}`;
    let updatePartTime = `UPDATE parts SET p_time_current=p_time_current+${timeIncrement} WHERE part_id=${partId}`;
    promises.push(dbQuery(updatePartDist), dbQuery(updatePartTime));
  })

  // update bike
  let updateBikeDist = `UPDATE bikes SET b_dist_current=b_dist_current+${distIncrement}, b_status='${status}' WHERE bike_id='${bikeId}'`;
  let updateBikeTime = `UPDATE bikes SET b_time_current=b_time_current+${timeIncrement} WHERE bike_id='${bikeId}'`;
  promises.push(dbQuery(updateBikeDist), dbQuery(updateBikeTime));

  return Promise.all(promises);
};


module.exports = login;


// future feature: if !lastLogin -> send complete userDataset w/...
  // a note that this is 1st login, all bikes with useage, label bikes in athleteData as active, the others as retired
  // ask user if this is correct

// future feature: if user wants to refresh all bikes with all-time usage 
  //(as might happen if user inserts an activity in middle of feed; current implementation updates based on last login date/time)