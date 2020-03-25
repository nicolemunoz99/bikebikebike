const axios = require('axios');
const stravaApi = require('./stravaApi.js');
const { dbQuery, get, insert, update, getCols } = require('../db.js');
const _ = require('lodash');

const allData = {
  get: async (req, res) => {

    console.log('req.body in allData.get', req.body)
    let { access_token, id } = req.body.permissions;

    let userDataset = await getUserWithBikesWithParts(id);
    let { last_login } = userDataset;

    let athleteDataPromise = stravaApi.get.infoWithBikes(access_token);
    let usageSinceLastLoginPromise = stravaApi.get.calcUsage(access_token, last_login);
    let [{ data: athleteData }, usageSinceLastLogin] = await Promise.all([athleteDataPromise, usageSinceLastLoginPromise]);

    // arrays of bike id's
    let dbActiveBikeIds = userDataset.bikes.reduce((totArr, bikeObj) => { // db - active and retired bikes
      if (bikeObj.status === 'active') return [...totArr, bikeObj.id];
      return [...totArr];
    }, []);
    let athleteDataBikeIds = athleteData.bikes.map(bike => bike.id); // strava - active bikes
    let activityLogBikeIds = Object.keys(usageSinceLastLogin); // strava - active and retired

    let dbPromises = [];

    // ... UPDATE DB ...
    // parts: for a given bike - take difference between usage of parts in DB and activeWithUsage - add it to part usage

    // for all bikes in activityLogBikeIds
    for (bikeId of activityLogBikeIds) {

      // NOT in dbBikesActive && NOT in athleteDataBikes
        // if in db as 'retired' (check userDataset)
          // update bike & parts to 'retired'
        // else 
          // insert as 'retired'

      // NOT in dbBikesActive && in athleteDataBikes
        // insert as 'active'

      // in dbBikesActive && NOT in athleteDataBikes
        // update bike as 'retired'
        // update parts as 'retired'

      // in dbBikesActive && in athleteDataBikes
        // update bike usage
        // update parts usage
    
      // update userInfo w/ last_login    
  }




    res.sendStatus(200);
    return;

    // one last get all updated user data from db
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

  let [ rawData, userInfoCols, bikeCols, partCols ] =
    await Promise.all([
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
}

const insertNewBike = (bikeObj) => {

}

const updateBikeAndParts = (bikeObj) => {

}


module.exports = allData;


// future feature: if !lastLogin -> send complete userDataset w/...
  // a note that this is 1st login, all bikes with useage, label bikes in athleteData as active, the others as retired
  // ask user if this is correct

// future feature: if user wants to refresh all bikes with all-time usage