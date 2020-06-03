const { CLIENT_PORT } = require('./config.js');

const express = require ('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));

// route GET to frontend routes
app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(CLIENT_PORT, () => console.log('Server listening on port ' + CLIENT_PORT))

console.log('client port: ', CLIENT_PORT)