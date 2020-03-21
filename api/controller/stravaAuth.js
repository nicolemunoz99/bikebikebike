require('custom-env').env(true);
const _ = require('lodash');
const axios = require ('axios');

const { insert } = require('../db.js');

const stravaAuth = async (req, res) => {
  // strava redirects here; recieve exchange token after user logs in on Strava

  if (req.query.scope !== 'read,activity:read_all,profile:read_all') {
    res.redirect(`${process.env.CLIENT}/stravaAuth`);
    return;
  }

  let stravaAccessQuery = `?client_id=${process.env.STRAVA_CLIENT_ID}` +
  `&client_secret=${process.env.STRAVA_CLIENT_SECRET}` +
  `&code=${req.query.code}` +
  `&grant_type=authorization_code`;

  let tokens = (await axios.post(`https://www.strava.com/oauth/token${stravaAccessQuery}`)).data;
  

  // add username and tokens to db
  tokens.id = tokens.athlete.id;
  tokens.username = req.query.username;
  tokens.scope = req.query.scope
  delete tokens.athlete;

  await insert('strava', tokens);
  await insert('userInfo', {id: tokens.id, join_date: Date.now()});

  res.redirect(`${process.env.CLIENT}/stravaAuth`);
};

module.exports = stravaAuth;