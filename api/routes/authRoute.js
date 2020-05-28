require('custom-env').env(true);
const axios = require('axios');
const CognitoExpress = require("cognito-express");
const authRoute = require('express').Router();
const login = require('../controller/login.js');
const part = require('../controller/part.js');
const { get, update } = require('../db.js');


const cognitoExpress = new CognitoExpress({
  region: "us-east-2",
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access", // access | id
  tokenExpiration: 3600000 // default expiration (3600000 ms)
});

// verify tokens with AWS Cognito
authRoute.use((req, res, next) => {

  let accessTokenFromClient = req.headers.accesstoken;
  if (!accessTokenFromClient) return res.status(401).send('Cognito Access Token missing from headers');
  
  cognitoExpress.validate(accessTokenFromClient, (err, cognitoResponse) => {
    if (err) return res.status(401).send(err);

    // ... LIMIT ACCESS for demo account...
    if (cognitoResponse.username === 'demo') { 
      req.query.username = cognitoResponse.username;
      req.body.limitedAccess = true; 
    }
    else if (cognitoResponse.username === 'demo_api') { req.query.username = 'demo'; }
    else { req.query.username = cognitoResponse.username; }

    next();
  });
});

// check if strava permissions in db
authRoute.use( async (req, res, next) => {

  let permissions = await get('strava', {username: req.query.username});

  if (permissions.length === 0 || permissions[0].scope !== 'read,activity:read_all,profile:read_all') {
    console.log('no strava permissions')
    res.status(201).send('user has not granted strava permissions');
    return;
  }
  req.body.permissions = permissions[0];
  next();
});

// refresh strava tokens if needed
authRoute.use( async (req, res, next) => {
  let { permissions } = req.body;

  if ( (permissions.expires_at*1000 - Date.now()) < 3600 ) {  // expires within 1 hr
        
    let stravaRefreshQuery = `?client_id=${process.env.STRAVA_CLIENT_ID}` +
      `&client_secret=${process.env.STRAVA_CLIENT_SECRET}` +
      `&refresh_token=${permissions.refresh_token}` +
      `&grant_type=refresh_token`;

    let dataToUpdate = {
      whereVar: {username: permissions.username},
      updateVars: (await axios.post(`https://www.strava.com/oauth/token${stravaRefreshQuery}`)).data
    };
    req.body.permissions = (await update('strava', dataToUpdate))[0];
  }
  next();
});

authRoute.get('/login', login.get );

authRoute.use( (req,res, next) => {
  // scoped down permissions - can't modify data
  if (req.body.limitedAccess) {
    return res.status(204).send('limitedAccess')
  }
  next();
});

authRoute.post('/part', part.post);
authRoute.put('/part/retire', part.retire);
authRoute.put('/part/service', part.service);
authRoute.put('/part', part.put);





module.exports = authRoute;