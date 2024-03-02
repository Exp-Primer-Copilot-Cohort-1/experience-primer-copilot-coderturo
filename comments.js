//create web server
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var url = require('url');

//add body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//set the port
app.set('port', process.env.PORT || 3000);

//set the path
app.use(express.static(path.join(__dirname, 'public')));

//set the path for the comments
var commentsPath = path.join(__dirname, 'comments.json');

//read the comments
app.get('/comments', function(req, res) {
  fs.readFile(commentsPath, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

//write the comments
app.post('/comments', function(req, res) {
  fs.readFile(commentsPath, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(commentsPath, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});

//start the server
server.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});