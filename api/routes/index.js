const router = require('express').Router();
const user = require('../controller/user.js');

router.get('/user/stravaAuth', user.stravaAuth) // strava redirects here;

module.exports = router;