require('custom-env').env(true);
const axios = require('axios')
const CognitoExpress = require("cognito-express")
const authRoute = require('express').Router();
const allData = require('../controller/allData.js');
const { get, update } = require('../db.js');


const cognitoExpress = new CognitoExpress({
  region: "us-east-2",
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "access", // access | id
  tokenExpiration: 3600000 // default expiration (3600000 ms)
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

// check if strava permissions in db
authRoute.use( async (req, res, next) => {
  console.log('req.query', {...req.query});

  let permissions = await get('strava', {...req.query});

  console.log('strava table: ', permissions);

  if (permissions.length === 0 || permissions[0].scope !== 'read,activity:read_all,profile:read_all') {
    res.status(201).send('user has not granted strava permissions');
    return;
  }
  req.body.permissions = permissions[0];
  next();
});

// refresh strava tokens if needed
authRoute.use( async (req, res, next) => {
  let permissions = req.body.permissions;
  console.log('permissions.expires_at', permissions.expires_at)
  if ((permissions.expires_at)*1000 < Date.now()) {  
    console.log('refreshing strava token')
    
    let stravaRefreshQuery = `?client_id=${process.env.CLIENT_ID}` +
      `&client_secret=${process.env.STRAVA_CLIENT_SECRET}` +
      `&refresh_token=${permissions.refresh_token}` +
      `&grant_type=refresh_token`;

    let dataToUpdate = {
      whereVar: {username: permissions.username},
      updateVars: (await axios.post(`https://www.strava.com/oauth/token${stravaRefreshQuery}`)).data
    };
    console.log('dataToUpdate: ', dataToUpdate)
    await update('strava', dataToUpdate)
  }
  next();
});

authRoute.get('/all-data', allData.get)



module.exports = authRoute;