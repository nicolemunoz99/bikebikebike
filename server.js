require('custom-env').env(true);
const port = process.env.SERVER_PORT;

const express = require ('express'),
      app = express();

const cors = require('cors'),
      path = require('path'),
      bodyParser = require('body-parser');

const authRoute = require('./api/routes/authRoute.js');
const stravaAuth = require('./api/controller/stravaAuth.js');
const defaultMetric = require('./api/controller/defaultMetric.js')

app.use('*', cors());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));

// ...api routes...
app.use('/stravaAuth', stravaAuth); // strava auth redirects here; no user auth required
app.get('/defaultMetric', defaultMetric); // default metrics; no user auth required
app.use('/api', authRoute); // user data; requires auth



// ...client routes...
app.get('*', (req, res) => { 
  console.log('routing to client')
  res.sendFile(path.join(__dirname, './client/dist/index.html'));
});

app.listen(port, () => console.log('Server listening on port ' + port));