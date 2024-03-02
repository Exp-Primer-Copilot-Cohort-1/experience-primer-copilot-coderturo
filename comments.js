// create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

// create in-memory database
var comments = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

app.get('/api/comments', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(comments));
});

app.post('/api/comments', function(req, res) {
  var newComment = req.body;
  newComment.id = Date.now();
  comments.push(newComment);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(newComment));
});

app.listen(3000, function() {
  console.log('Server started: http://localhost:3000/');
});
```

####
