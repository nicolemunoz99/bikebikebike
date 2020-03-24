const axios = require('axios');
const stravaApi = require('./stravaApi.js');
const { dbQuery, get, insert, update, getCols } = require('../db.js'); 
const _ = require('lodash');

const allData = {
  get: async (req, res) => {

    console.log('req.body in allData.get', req.body)
    let { access_token, id } = req.body.permissions;


    // ...DETERMINE IF ANY NEW BIKES FROM STRAVA...
    
    // Promise.all
      // stravaApi athlete/bikes
      // db: user with bikes with parts
    let athleteDataPromise = stravaApi.get.infoWithBikes(access_token);
    let userDatasetPromise = getUserWithBikesWithParts(id);

    let [{ ['data']: athleteData }, userDataset] = await Promise.all([athleteDataPromise, userDatasetPromise]);
    let { last_ride_id } = userDataset;
    let bikesInDb = userDataset.bikes;

    console.log('athleteData', athleteData)
    let newBikes = [];
    let activeBikes = [];

    athleteData.bikes.forEach(stravaBike => {
      let commonIndex = bikesInDb.findIndex(dbBike => {
        return stravaBike.id === dbBike.bike_id; 
      });
      if (commonIndex >= 0 ) { activeBikes.push(stravaBike); }
      else { newBikes.push(stravaBike); }
    });



    // ... GET USAGE FROM STRAVA ACTIVITY DATA ...

    let bikesWithUsage = await Promise.all ([
      stravaApi.get.calcUsage(newBikes, access_token),
      stravaApi.get.calcUsage(activeBikes, access_token, last_ride_id)
    ]);

    bikesWithUsage = _.zipObject(['newBikes', 'activeBikes'], bikesWithUsage)
    console.log('bikesWithUsage', bikesWithUsage);

    
    // future feature: if user wants to refresh all bikes with all-time usage
    if (false) { 
      stravaApi.get.allUsage( [...newBikes, ...activeBikes] );
    }


    // ... UPDATE DB ...
    // Promise.all:
      
    // await updateUsage(id, bikesWithUsage);
      
      
      // update userInfo w/ latest ride
      

    // format data and send to client

    res.sendStatus(200)
  }
};




const getUserWithBikesWithParts = async (stravaId) => {
  
  let queryText = `SELECT * FROM userInfo LEFT JOIN ` +
    `(SELECT * FROM bikes LEFT JOIN parts ON bikes.bike_id=parts.p_bike_id WHERE bikes.strava_id=${stravaId}) b ` +
    `ON userInfo.id=b.strava_id WHERE userInfo.id=${stravaId}`
    
  let rawData = await dbQuery(queryText);

  // format
  let [ userInfoCols, bikeCols, partCols ] = await Promise.all([ getCols('userinfo'), getCols('bikes'), getCols('parts') ]);

  let formattedData = _.pick(rawData[0], userInfoCols);

  let bikesWithParts = [];
  let uniqBikeIdElements = _.uniqBy(rawData, 'bike_id');
  for (let uniqEl of uniqBikeIdElements) {
    let bikeObj = _.pick(uniqEl, bikeCols);
    delete bikeObj.strava_id;
    bikeObj.parts = [];
    let partCollection = _.filter(rawData, _.matches({'p_bike_id': uniqEl.bike_id}));
    partCollection.forEach(partEl => {
      delete partEl.p_bike_id;
      bikeObj.parts.push(_.pick(partEl, partCols));
    });
    bikesWithParts.push(bikeObj);
  }
  formattedData.bikes = bikesWithParts;

  return formattedData;
}

const updateUsage = async (stravaId, bikes) => {
  let promises = [];

  let { newBikes, activeBikes } = bikes;

  // ... UPDATE PARTS ...

  
  // ... UPDATE BIKES ...
  // post new bikes with useage
  // update existing bikes with latest usage
  


}



module.exports = allData;