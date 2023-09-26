var express = require('express');
var app = express();
var bodyParser = require('body-parser');


// Middleware to parse JSON data
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/test.html');
});

app.post('/posts', function (req, res) {
  console.log('Received data:', req.body);
  
  // You can process the data here as needed.

  res.sendStatus(200); // Send a success response
});

app.listen(3001, function () {
  console.log('Example app listening on port 3000!');
});