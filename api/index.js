require('custom-env').env(true, '../');

const port = process.env.API_PORT;

const express = require ('express'),
      app = express();

const cors = require('cors'),
      path = require('path'),
      bodyParser = require('body-parser');


const authRoute = require('./routes/authRoute.js');
const oauth2 = require('./controller/oauth2.js');
const defaultMetric = require('./defaultMetric/defaultMetric.js');


const corsClientOptions = {
  origin: process.env.CLIENT
};

const corsStravaOptions = {
  origin: '*'
};


app.use(bodyParser.json());

app.use('/api/oauth2', cors(corsStravaOptions), oauth2); // strava auth redirects here; no app-level auth required
app.get('/api/defaultMetric', cors(corsClientOptions), defaultMetric); // default metrics; no app-level auth required
app.use('/api/', cors(corsClientOptions), authRoute); // protected route



app.listen(port, () => console.log('Server listening on port ' + port));
