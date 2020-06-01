require('custom-env').env(true);
const express = require ('express');
const port = process.env.CLIENT_PORT;
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));

// route GET to frontend routes
app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(port, () => console.log('Server listening on port ' + port))

console.log('client port: ', process.env.CLIENT_PORT)