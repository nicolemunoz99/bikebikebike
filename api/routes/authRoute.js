require('custom-env').env(true);
const CognitoExpress = require("cognito-express")
const authRoute = require('express').Router();
const { get } = require('../db.js');


const cognitoExpress = new CognitoExpress({
  region: "us-east-2",
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access", // access | id
  tokenExpiration: 3600000 //Up to default expiration (3600000 ms)
});

// verify tokens with AWS Cognito
authRoute.use((req, res, next) => {
  console.log('IN authRoute')
  let accessTokenFromClient = req.headers.accesstoken;
  if (!accessTokenFromClient) return res.status(401).send('Cognito Access Token missing from headers');
  
  cognitoExpress.validate(accessTokenFromClient, (err, cognitoResponse) => {
    if (err) return res.status(401).send(err);
    
    console.log('authenticated!', cognitoResponse.username);
    req.query.username = cognitoResponse.username
    next();
  });
});

// check if strava auth in db
authRoute.use( async (req, res, next) => {
  console.log('req.query', {...req.query});

  let user = await get('strava', {...req.query});
  console.log('user in strava table: ', user);
  // if user dosn't exist in db | hasn't given proper strava auth
  if (user.length === 0 || user[0].scope !== 'read,activity:read_all,profile:read_all') {
    res.status(201).send('user has not granted strava permissions');
    return;
  }
  
  next();
  
});



module.exports = authRoute;