const stravaApi = require('./stravaApi.js');
const { dbQuery, insert, update, getCols } = require('../db.js');
const _ = require('lodash');

const login = {
  get: async (req, res) => {

    console.log('req.body in allData.get', req.body)
    let { access_token, id } = req.body.permissions;

    let userDataset = await getUserWithBikesWithParts(id);
    let { last_login } = userDataset;
    console.log('userDataset', userDataset);


    let athleteDataPromise = stravaApi.get.infoWithBikes(access_token);
    let usageSinceLastLoginPromise = stravaApi.get.calcUsage(access_token, last_login);

    let [{ data: athleteData }, usageSinceLastLogin] = await Promise.all([athleteDataPromise, usageSinceLastLoginPromise]);

    // arrays of bike id's
    let dbActiveBikeIds = userDataset.bikes.reduce((totArr, bikeObj) => { // db - active bikes
      if (bikeObj.status === 'active') return [...totArr, bikeObj.id];
      return [...totArr];
    }, []);
    let athleteDataBikeIds = athleteData.bikes.map(bike => bike.id); // strava - active bikes
    let activityLogBikeIds = Object.keys(usageSinceLastLogin); // strava - active and retired
    let zeroActivityBikeIds = _.difference(athleteDataBikeIds, activityLogBikeIds); // bikes without activity (needed for first logins)
    let dbPromises = [];

    // ... UPDATE DB ...
    let bikesToAddOrUpdate = !last_login ? [...activityLogBikeIds, ...zeroActivityBikeIds] : activityLogBikeIds;

    for (bikeId of bikesToAddOrUpdate) {
      // NOT in dbBikesActive && in athleteDataBikes
      if (!dbActiveBikeIds.includes(bikeId) && athleteDataBikeIds.includes(bikeId)) {
        // insert as 'active'
        let newBike = formatNewBike( athleteData.bikes.find(el => el.id === bikeId), usageSinceLastLogin[bikeId] );
        dbPromises.push( insert('bikes', { ...newBike, strava_id: id }) );
      }

      // in dbBikesActive && NOT in athleteDataBikes
      if (dbActiveBikeIds.includes(bikeId) && !athleteDataBikeIds.includes(bikeId)) {
        // user retired bike since last login
        dbPromises.push( updateBikeAndParts(bikeId, usageSinceLastLogin[bikeId], 'retired') );
      }

      // in dbBikesActive && in athleteDataBikes
      if (dbActiveBikeIds.includes(bikeId) && athleteDataBikeIds.includes(bikeId)) {
        // update bike and parts useage
        dbPromises.push( updateBikeAndParts(bikeId, usageSinceLastLogin[bikeId], 'active') );
      }

      // NOT in dbBikesActive && NOT in athleteDataBikes
      if (!dbActiveBikeIds.includes(bikeId) && !athleteDataBikeIds.includes(bikeId)) {
        // user added and retired bike since last login - ask user if they want to import
      }
    }

    // update userInfo w/ last_login
    dbPromises.push( update('userInfo', { whereVar: { id }, updateVars: {last_login: Date.now()/1000 } }) );

    await Promise.all(dbPromises);

    // get all updated user data
    let updatedDataset = await getUserWithBikesWithParts(id);
    updatedDataset.measure_pref = athleteData.measurement_preference;
    // convert distance units to measurement pref
    // ?? convert time to hours

    res.sendStatus(200)


  }
};


const getUserWithBikesWithParts = async (stravaId) => {

  let queryText = `SELECT * FROM userInfo LEFT JOIN ` +
    `(SELECT * FROM bikes LEFT JOIN parts ON bikes.bike_id=parts.p_bike_id WHERE bikes.strava_id=${stravaId}) b ` +
    `ON userInfo.id=b.strava_id WHERE userInfo.id=${stravaId}`

  // let queryText = 'select * from bikes';

  let [rawData, userInfoCols, bikeCols, partCols] = await Promise.all([
      dbQuery(queryText),
      getCols('userinfo'),
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
      bikeObj.parts.push(_.pick(partEl, partCols));
    });
    bikesWithParts.push(bikeObj);
  }
  formattedData.bikes = bikesWithParts;

  return formattedData;
};

const formatNewBike = (newBike, latestUse, status='active') => {

  newBike.bike_id = newBike.id
  newBike.b_status = status;
  newBike.b_dist_current = latestUse ? latestUse.distSinceLastLogin : 0;
  newBike.b_dist_at_add = newBike.b_dist_current;
  newBike.b_time_current = latestUse ? latestUse.timeSinceLastLogin : 0;
  newBike.b_time_at_add = newBike.b_time_current;
  newBike.b_date_added = Date.now();

  (['primary', 'resource_state' , 'id' , 'distance' ]).forEach(el => delete newBike[el]);
  
  return newBike;
};


const updateBikeAndParts = async (bikeId, latestUse, status) => {
  let promises = [];
  
  let bikeInDb = userDataset.bikes.find(el => el.bike_id === bikeId);
  let distIncrement = latestUse.distSinceLastLogin
  let timeIncrement = latestUse.timeSinceLastLogin

  // update parts
  let parts = bikeInDb.parts;
  parts.forEach(part => {
    let partId = part.part_id
    let updatePartDist = `UPDATE parts SET p_dist_current=p_dist_current+${distIncrement}, p_status=${status} WHERE part_id=${partId}`
    let updatePartTime = `UPDATE parts SET p_time_current=p_time_current+${timeIncrement} WHERE part_id=${partId}`
    promises.push(dbQuery(updatePartDist), dbQuery(updatePartTime));
  })

  // update bike
  let updateBikeDist = `UPDATE bikes SET b_dist_current=b_dist_current+${distIncrement}, b_status=${status} WHERE bike_id=${bikeId}`;
  let updateBikeTime = `UPDATE bikes SET b_time_current=b_time_current+${timeIncrement} WHERE bike_id=${bikeId}`;
  promises.push(dbQuery(updateBikeDist), dbQuery(updateBikeTime));

  return Promise.all(promises);
};


module.exports = login;


// future feature: if !lastLogin -> send complete userDataset w/...
  // a note that this is 1st login, all bikes with useage, label bikes in athleteData as active, the others as retired
  // ask user if this is correct

// future feature: if user wants to refresh all bikes with all-time usage