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
    let stravaBikes = athleteData.bikes
    let newBikes = [];
    let activeBikes = [];

    stravaBikes.forEach(stravaBike => {
      let commonIndex = bikesInDb.findIndex(dbBike => {
        return stravaBike.id === dbBike.bike_id; 
      });
      if (commonIndex >= 0 ) { activeBikes.push(stravaBike.id); }
      else { newBikes.push(stravaBike.id); }
      // Future feature: if bike in DB but not in stravaBikes - change status to 'retired'
    });


    // ... GET USAGE FROM STRAVA ACTIVITY DATA ...
    let [newWithUsage, activeWithUsage] = await Promise.all ([
      stravaApi.get.calcUsage(newBikes, access_token),
      stravaApi.get.calcUsage(activeBikes, access_token, last_ride_id)
    ]);

    // future feature: if user wants to refresh all bikes with all-time usage
    if (false) { 
      stravaApi.get.calcUsage( [...newBikes, ...activeBikes] );
    }


    // add strava data to newWithUsage
    newWithUsage = stravaBikes.map(bike => {
      bike.bike_id = bike.id; 
      ['id', 'primary', 'resource_state', 'distance'].forEach(el => delete bike[el]);
      return { ...newWithUsage[bike.bike_id], ...bike };
      // future feature: get make, model details from stravaApi;
    });

    console.log('newWithUsage', newWithUsage);

    // ... UPDATE DB ...
    let updatePromises = [];
    // insert new bikes;
    newWithUsage.forEach(bike => updatePromises.push(insert('bikes', {...bike, strava_id: id})))
    await Promise.all(updatePromises);
    // update parts: for a given bike - take difference between usage of parts in DB and activeWithUsage - add it to part in db
    // update bikes: with activeWithBike
    // update userInfo w/ latest ride
      

    // one last get all updated user data from db
    let updatedDataset = await getUserWithBikesWithParts(id);
    updatedDataset.measure_pref = athleteData.measurement_preference;
    // convert distance units to measurement pref
    // conver time to hours

    res.sendStatus(200)
  }
};




const getUserWithBikesWithParts = async (stravaId) => {
  
  let queryText = `SELECT * FROM userInfo LEFT JOIN ` +
    `(SELECT * FROM bikes LEFT JOIN parts ON bikes.bike_id=parts.p_bike_id WHERE bikes.strava_id=${stravaId}) b ` +
    `ON userInfo.id=b.strava_id WHERE userInfo.id=${stravaId}`
  

  // format
  let [ rawData, userInfoCols, bikeCols, partCols ] = 
          await Promise.all([
            dbQuery(queryText), 
            getCols('userinfo'), 
            getCols('bikes'), getCols('parts') 
          ]);

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
  let { newBikes, activeBikes } = bikes;
  
  let updatePromises = [];


  // ... UPDATE PARTS ...

  
  // ... UPDATE BIKES ...
  // post new bikes with useage

  // update existing bikes with latest usage
  


}



module.exports = allData;