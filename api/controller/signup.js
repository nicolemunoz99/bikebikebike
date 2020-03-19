const { get } = require('../db.js');
const path = require('path');

let signup = async (req, res) => {
  console.log('signup')
  // create account
  // redirect to link with username to authenticate with Strava 

  res.redirect('http://localhost:9000')
  res.sendStatus(200);
};

module.exports = signup;