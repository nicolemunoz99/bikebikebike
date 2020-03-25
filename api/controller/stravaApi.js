const { get } = require('../db.js');
const axios = require('axios');
const xDate = require('xdate')


const strava = {

  get: {

    infoWithBikes: (token) => {
      console.log('IN strava.infoWithBikes.get', token)
      return axios.get(`${process.env.STRAVA_API}/athlete`, {
                headers: { Authorization: `Bearer ${token}`}
              });
    },
  
  
    calcUsage: async (token, lastLogin) => {
      let bikesWithData = {};
      let page = 1;

      let afterQuery = lastLogin ? `&after=${ lastLogin }` : '';

      while (true) {
        let activitesPage = (await (axios.get(`${process.env.STRAVA_API}/athlete/activities?page=${page}${afterQuery}`, {
          headers: { Authorization: `Bearer ${token}`}
        }))).data;

        if ( activitesPage.length === 0 ) break;
        
        for (activity of activitesPage) {
          if ( activity.type === 'Ride' && activity.gear_id ) {
            if ( !bikesWithData[activity.gear_id] ) bikesWithData[activity.gear_id] = {distSinceLastLogin: 0, timeSinceLastLogin: 0};
            bikesWithData[activity.gear_id].timeSinceLastLogin += activity.moving_time;
            bikesWithData[activity.gear_id].distSinceLastLogin += activity.distance;
          }
        }

        page++

      }
      console.log('done with calc');
      return bikesWithData;
    }

  },

  post: {
    // future feature
  }

};

module.exports = strava;