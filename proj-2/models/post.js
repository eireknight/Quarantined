var express = require('express');
var mysql = require('mysql');
var authController = require('./controllers/auth.js');
var content = require('./lib/create.js');
var connection = mysql.createPool({
    user: 'root',
    database: 'forum'
    });
var myContent = new content(connection);
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/auth', authController(myContent));
app.use(express.static("../public"));

app.get('/', function(request, response) {
    "To be implemented"
});

app.get('/sort/:method', function(request, response) {
    response.send("TO BE IMPLEMENTED");
});

app.get('/post/:postId', function(request, response) {
    response.send("TO BE IMPLEMENTED");
});

app.post('/vote', function(request, response) {
    response.send("TO BE IMPLEMENTED");
});

app.get('/createPost', function(request, response) {
    response.send("TO BE IMPLEMENTED");
});

app.post('/createPost', function(request, response) {
    response.send("TO BE IMPLEMENTED");
});

require("../routes/apiRoutes.js")(app);

require("../routes/htmlRoutes.js")(app);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Web server is listening on http://localhost:' + port);
});

module.exports = post;