const port = 8080;
const express = require ('express');
const cors = require('cors');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const router = require('./api/routes')

app.use('*', cors());

app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist'));


// ...api routes...
app.use('/', router);



app.get('*', (req, res) => { // all other get requests are frontend routes
  res.sendFile(path.join(__dirname, './client/dist/index.html'));
});

app.listen(port, () => console.log('Server listening on port ' + port));