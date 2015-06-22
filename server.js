// set up ======================================================================
var express = require('express');
var app = express();                               // create our app w/ express
var port = process.env.PORT || 8080;                // set the port
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use (function (error, req, res, next){
    var errorResponse=require('./errorResponse.json');
    res.setHeader('content-type', 'application/json');
    res.status(400);
    res.json(errorResponse);
});

// routes ======================================================================
require('./routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);

module.exports =app;