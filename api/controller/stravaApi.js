const axios = require('axios');


const strava = {

  get: {

    infoWithBikes: (token) => {
      return axios.get(`${process.env.STRAVA_API}/athlete`, {
        headers: { Authorization: `Bearer ${token}`}
      });
    },
  
  
    calcUsageSinceDate: async (token, lastLogin=null, bikeId=null) => {
      let bikesWithData = {};
      let page = 1;
      let afterQuery = lastLogin ? `&after=${lastLogin / 1000}` : ''; // strava's dates are secs

      const bikeCriterion = (idToCheck) => {
        if (bikeId)  return idToCheck === bikeId;
        return idToCheck;
      };

      while (true) {
        let activitesPage = (await (axios.get(`${process.env.STRAVA_API}/athlete/activities?page=${page}${afterQuery}`, {
          headers: { Authorization: `Bearer ${token}`}
        }))).data;

        if ( activitesPage.length === 0 ) break;
        
        for (activity of activitesPage) {
          if ( activity.type === 'Ride' && bikeCriterion(activity.gear_id)  ) {
            if ( !bikesWithData[activity.gear_id] ) bikesWithData[activity.gear_id] = {distSinceDate: 0, timeSinceDate: 0};
            bikesWithData[activity.gear_id].timeSinceDate += activity.moving_time;
            bikesWithData[activity.gear_id].distSinceDate += activity.distance;
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