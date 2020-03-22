const axios = require('axios');
const stravaApi = require('./stravaApi.js');
const { get, insert, update } = require('../db.js'); 

const allData = {
  get: async (req, res) => {
    console.log('in allData.get', req.body)

    // Promise.all: strava athlete/bikes, db bikes
    let athleteDataPromise = stravaApi.get.infoWithBikes(req.body.permissions);
    let bikesInDbPromise = get('bikes', {strava_id: req.body.permissions.id});
    
    let [{ ['data']: athleteData }, bikesInDb] = await Promise.all([athleteDataPromise, bikesInDbPromise]);

    console.log('athleteData', athleteData)


    // Promise.all:
      // for new bikes: stravaApi.get.allUsage
      // for bikes already in db: stravaApi.get.latestUsage since userInfo.last_ride_id

    // Promise.all:
      // update userInfo table (measurement pref, latest ride, etc)
      // post new bikes
      // update existing bikes with latest usage
      // update parts with latest usage

    // format data and send

    res.sendStatus(200)
  }
};



module.exports = allData;