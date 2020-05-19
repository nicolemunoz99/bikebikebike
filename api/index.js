const apiRoute = require('express').Router();
const authRoute = require('./routes/authRoute.js');
const stravaAuth = require('./controller/stravaAuth.js');
const defaultMetric = require('./defaultMetric/defaultMetric.js');


apiRoute.use('/stravaAuth', stravaAuth); // strava auth redirects here; no app-level auth required
apiRoute.get('/defaultMetric', defaultMetric); // default metrics; no app-level auth required
apiRoute.use('/', authRoute); // user data; requires auth

module.exports = apiRoute;