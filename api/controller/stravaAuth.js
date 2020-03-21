require('custom-env').env(true);
const _ = require('lodash');
const axios = require ('axios');

const { insert } = require('../db.js');

const stravaAuth = async (req, res) => {
    // recieve exchange token after user logs in on Strava
    console.log('stravaAuth')
    let stravaAccessQuery = `?client_id=${process.env.STRAVA_CLIENT_ID}` +
    `&client_secret=${process.env.STRAVA_CLIENT_SECRET}` +
    `&code=${req.query.code}` +
    `&grant_type=authorization_code`;

    let tokens = (await axios.post(`https://www.strava.com/oauth/token${stravaAccessQuery}`)).data;

    tokens.id = tokens.athlete.id;
    delete tokens.athlete;

    await insert('auth', tokens);
    await insert('userInfo', {id: tokens.id, join_date: Date.now()});

    res.redirect(`${process.env.CLIENT}`);
};

module.exports = stravaAuth;