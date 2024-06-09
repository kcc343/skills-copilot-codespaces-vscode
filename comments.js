// Create web server

// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// Create web server
var app = express();
app.use(bodyParser.json());

// Load comments from file
var comments = [];
fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
        console.log('Error reading comments.json: ' + err);
    } else {
        comments = JSON.parse(data);
    }
});

// GET /comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// POST /comments
app.post('/comments', function(req, res) {
    var comment = req.body;
    comment.id = comments.length;
    comments.push(comment);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log('Error writing comments.json: ' + err);
        }
    });
    res.json(comment);
});

// Start web server
var server = app.listen(3000, function() {
    console.log('Web server started at http://localhost:3000');
});