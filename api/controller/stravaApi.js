const { get } = require('../db.js');
const axios = require('axios');

const strava = {

  get: {

    infoWithBikes: (token) => {
      console.log('IN strava.infoWithBikes.get', token)
      return axios.get(`${process.env.STRAVA_API}/athlete`, {
                headers: { Authorization: `Bearer ${token}`}
              });
    },
  
  
    calcUsage: async (bikes, token, lastRideId) => {
      let bikesWithData = {};
      bikes.forEach(id => bikesWithData[id] = {dist_current: 0, time_current: 0});
      let page = 1;

      while (true) {
        let activitesPage = (await (axios.get(`${process.env.STRAVA_API}/athlete/activities?page=${page}`, {
          headers: { Authorization: `Bearer ${token}`}
        }))).data;

        if (activitesPage.length === 0 ) break;
        
        for (activity of activitesPage) {
          if (lastRideId && activity.id === lastRideId) break;
          if ( activity.type === 'Ride' && activity.gear_id && Object.keys(bikesWithData).includes(activity.gear_id) ) {
            bikesWithData[activity.gear_id].time_current += activity.moving_time;
            bikesWithData[activity.gear_id].dist_current += activity.distance;
          }
        }
        page++
      }
      return bikesWithData;
    }

  },

  post: {
    // future feature
  }

};

module.exports = strava;