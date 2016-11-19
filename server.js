var express = require('express')

var config = require('./server/config.js');
var mongoose = require('mongoose');
var todo = require('./server/widgets/todo/todo-widget');
var note = require('./server/widgets/note/note-widget');
var secure = require('./server/secure/passport');
var widgetDescriptor = require('./server/core/widgets/widget-descriptor');
var bodyParser = require('body-parser');
var passport = require('passport');
var path = require('path');

//var LocalStrategy = require('passport-local').LocalStrategy;
var session = require('express-session');
var strategy = require('./server/secure/passport-strategy');

mongoose.connect(config.mongoUrl);
strategy(passport);

var app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false

}));

app.use('/', express.static("./client"));
app.use('/node_modules', express.static("./node_modules"));

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/api/todo/', todo);
app.use('/api/note/', note);
app.use('/api/core/widgets/widgetDescriptor/', widgetDescriptor);
app.use('/api/secure/', secure);

app.use(function (req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile(__dirname + '/client/index.html');
});

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.listen(3000)