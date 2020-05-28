const apiRoute = require('express').Router();
const authRoute = require('./routes/authRoute.js');
const oauth2 = require('./controller/oauth2.js');
const defaultMetric = require('./defaultMetric/defaultMetric.js');
const cors = require('cors');

const corsClientOptions = {
  origin: process.env.CLIENT
}

const corsStravaOptions = {
  origin: '*'
}

apiRoute.use('/oauth2', cors(corsStravaOptions), oauth2); // strava auth redirects here; no app-level auth required
apiRoute.get('/defaultMetric', cors(corsClientOptions), defaultMetric); // default metrics; no app-level auth required
apiRoute.use('/', cors(corsClientOptions), authRoute); // user data; requires auth

module.exports = apiRoute;
