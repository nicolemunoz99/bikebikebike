require('custom-env').env(true);
const CognitoExpress = require("cognito-express")
const authRoute = require('express').Router();
const signup = require('../controller/signup.js');
const login = require('../controller/login.js');

const cognitoExpress = new CognitoExpress({
  region: "us-east-2",
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access" || "id", //Possible Values: access | id
  tokenExpiration: 3600000 //Up to default expiration of 1 hour (3600000 ms)
});

// verify tokens with AWS Cognito
authRoute.use((req, res, next) => {
  let accessTokenFromClient = req.headers.accesstoken;
  if (!accessTokenFromClient) return res.status(401).send('Access Token missing from headers');
  
  cognitoExpress.validate(accessTokenFromClient, (err, response) => {
    if (err) return res.status(401).send(err);
    console.log('authenticated!');
    next();
  })
});

// has user authenticated with strava?
authRoute.use((req, res, next) => {
  console.log('req.query', req.query);
  // if user dosn't exist | hasn't given proper strava auth
    // redirect client to /authenticateWithStrava
  // otherwise
    // route request to /gear
  res.sendStatus(201)
});


authRoute.get('/login', login);

module.exports = authRoute;