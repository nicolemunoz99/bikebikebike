require('custom-env').env(true);
const port = process.env.SERVER_PORT;

const express = require ('express'),
      app = express();

const cors = require('cors'),
      path = require('path'),
      bodyParser = require('body-parser');

const api = require('./api');


app.use('*', cors());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));

// ...api routes...
app.use('/api', api);


// ...client routes...
app.get('*', (req, res) => { 
  console.log('routing to client')
  res.sendFile(path.join(__dirname, './client/dist/index.html'));
});

app.listen(port, () => console.log('Server listening on port ' + port));