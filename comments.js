// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Read the comments.json file
var comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Static files
app.use(express.static('public'));

// Set up the server
app.listen(3000, function() {
  console.log('Server is running on port 3000');
});

// Routes
app.get('/comments', function(req, res) {
  res.json(comments);
});

app.post('/comments', function(req, res) {
  comments.push(req.body);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comments);
});

app.put('/comments/:id', function(req, res) {
  var id = req.params.id;
  comments[id] = req.body;
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comments);
});

app.delete('/comments/:id', function(req, res) {
  var id = req.params.id;
  comments.splice(id, 1);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comments);
});