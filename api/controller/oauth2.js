require('custom-env').env(true, '../../');
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
  let status = 301;
  // add username and tokens to db
  tokens.id = tokens.athlete.id;
  tokens.username = req.query.username;
  tokens.scope = req.query.scope
  delete tokens.athlete;
  try {
    await insert('strava', tokens);
    await insert('user_info', {id: tokens.id, join_date: Date.now()});
  }
  catch (err) {
    console.log(err)
    if (err.constraint === 'strava_pkey') status = 301;; // strava acct already registered;
  }


  res.redirect(status, `${process.env.CLIENT}/stravaAuth`);
};

module.exports = stravaAuth;