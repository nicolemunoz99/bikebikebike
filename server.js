require('custom-env').env(true);
const express = require ('express'),
      app = express();

const cors = require('cors'),
      path = require('path'),
      bodyParser = require('body-parser');

const authRoute = require('./api/routes/authRoute.js'),
      stravaAuth = require('./api/controller/stravaAuth.js');

app.use('*', cors());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));

// ...api routes...
app.use('/api', authRoute);
app.use('/stravaAuth', stravaAuth); // strava auth redirects here


// ...client routes...
app.get('*', (req, res) => { 
  console.log('routing to client')
  res.sendFile(path.join(__dirname, './client/dist/index.html'));
});

app.listen(process.env.PORT, () => console.log('Server listening on port ' + process.env.PORT));