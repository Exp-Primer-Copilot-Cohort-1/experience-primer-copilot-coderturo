// create web server
var express = require('express');
var app = express();

// create a route
app.get('/comments', function(request, response) {
  // send the response
  response.json([
    {
      "id": 1,
      "author": "Morgan McCircuit",
      "body": "Great picture!"
    },
    {
      "id": 2,
      "author": "Bending Bender",
      "body": "Excellent stuff"
    }
  ]);
});

// start the server
app.listen(3000, function() {
  console.log('Server is running on port 3000');
});


