const apiRoute = require('express').Router();
const authRoute = require('./routes/authRoute.js');
const oauth2 = require('./controller/oauth2.js');
const defaultMetric = require('./defaultMetric/defaultMetric.js');


apiRoute.use('/oauth2', oauth2); // strava auth redirects here; no app-level auth required
apiRoute.get('/defaultMetric', defaultMetric); // default metrics; no app-level auth required
apiRoute.use('/', authRoute); // user data; requires auth

module.exports = apiRoute;