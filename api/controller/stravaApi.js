const { get } = require('../db.js');
const axios = require('axios');

const strava = {

  get: {

    infoWithBikes: (permissions) => {
      console.log('IN strava.infoWithBikes.get', permissions.access_token)
      return axios.get(`${process.env.STRAVA_API}/athlete`, {
                headers: { Authorization: `Bearer ${permissions.access_token}`}
              });
    },
  
    latestUsage: (req, res) => {
  
    },
  
    allUsage: (req, res) => {
  
    }

  },

  post: {
    // future features
  }

};

module.exports = strava;