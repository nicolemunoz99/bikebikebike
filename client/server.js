const express = require ('express');
const port = 7500;
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist'));

// route GET to frontend routes
app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(port, () => console.log('Server listening on port ' + port))
