
require('babel-register');
var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
var router = require('./routes');

app.use(bodyParser.json());
// app.use('/dist', express.static(__dirname + '/./dist'));
app.use(express.static('./webApp'));
app.use(express.static('./webApp/css'));
app.use(express.static('./webApp/Templates'));
app.use('/bower_components', express.static(__dirname + '/./bower_components'));


// application -------------------------------------------------------------

require('./routes.js')(app);

app.get('*', function(req, res) {
    res.sendfile(__dirname + '/webApp/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(process.env.PORT || 3000);
console.log("App listening on port 3000");