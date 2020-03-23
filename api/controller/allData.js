const axios = require('axios');
const stravaApi = require('./stravaApi.js');
const { dbQuery, get, insert, update } = require('../db.js'); 
const _ = require('lodash');

const allData = {
  get: async (req, res) => {

    console.log('in allData.get', req.body)
    let { access_token, id } = req.body.permissions;

    let data = await getAllDbData(id);

    let { last_ride_id } = (await dbQuery(`SELECT last_ride_id FROM userInfo WHERE id=${id}`))[0];
    console.log('last_ride_id: ', last_ride_id)



    // ...DETERMINE IF ANY NEW BIKES FROM STRAVA...
    
    // Promise.all
      // stravaApi athlete/bikes
      // db: userInfo with bikes with parts
    let athleteDataPromise = stravaApi.get.infoWithBikes(access_token);
    let bikesInDbPromise = get('bikes', {strava_id: req.body.permissions.id});
    let [{ ['data']: athleteData }, bikesInDb] = await Promise.all([athleteDataPromise, bikesInDbPromise]);

    console.log('athleteData', athleteData)
    let newBikes = [];
    let oldBikes = [];

    athleteData.bikes.forEach(stravaBike => {
      let commonIndex = bikesInDb.findIndex(dbBike => {
        return stravaBike.id === dbBike.id 
      });
      if (commonIndex >= 0 ) { oldBikes.push(stravaBike); }
      else { newBikes.push(stravaBike) }
    });



    // ... GET USAGE FROM STRAVA ACTIVITY DATA ...
    let newBikesWithUsage = await stravaApi.get.calcUsage(newBikes, access_token);
    console.log('newBikesWithUsage: ', newBikesWithUsage)
    let oldBikesWithLatestUsage = await stravaApi.get.calcUsage(oldBikes, access_token, last_ride_id);
    console.log('oldBikesWithLatestUsage: ', oldBikesWithLatestUsage)
    
    // if user wants to refresh all data with all-time usage
    if (false) { // TODO conditional TBD
      updateUseagePromise = stravaApi.get.allUsage( oldBikes.map(el => ({[el.id]: {miles: 0, hours: 0}})) );
    }

    // ... UPDATE DB ...
    // Promise.all:
      // update userInfo table (measurement pref, latest ride, etc)
      // post new bikes with all useage
      // update existing bikes with latest usage
      // update parts with latest usage

    // format data and send to client

    res.sendStatus(200)
  }
};


const getAllDbData = async (stravaId) => {
  console.log('stravaId: ', stravaId)
  let queryText =  `SELECT *, userInfo.id AS strava_id FROM userInfo LEFT JOIN ` +
    `(SELECT *, bikes.id AS bike_id FROM bikes LEFT JOIN ` +
    `(SELECT *, parts.id AS part_id FROM parts) b ` +
    `ON bikes.id=b.bike_id WHERE strava_id=${stravaId}) a ` +
    `ON userInfo.id=a.strava_id WHERE userInfo.id=${stravaId}`;

  // let queryText = `SELECT * from bikes LEFT JOIN parts ON bikes.id=parts.bike_id WHERE strava_id=${stravaId}`

  console.log('queryText: ', queryText)
  return await dbQuery(queryText);

};



module.exports = allData;