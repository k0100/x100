var express = require('express')

var config = require('./server/config.js');
var mongoose = require('mongoose');
var todo = require('./server/widgets/todo/todo-widget');
var note = require('./server/widgets/note/note-widget');
var library = require('./server/widgets/library/library-widget');

var secure = require('./server/secure/passport');
var widgetDescriptor = require('./server/core/widgets/widget-descriptor');
var widgetBoardItem = require('./server/core/widgets/widget-board-item');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var passport = require('passport');
var path = require('path');
var promise = require('promise');
//var LocalStrategy = require('passport-local').LocalStrategy;
var session = require('express-session');
var strategy = require('./server/secure/passport-strategy');

mongoose.Promise = promise;
mongoose.connect(config.mongoUrl);
strategy(passport);

var app = express()

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false

}));



app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(function (req, res, next) {
  if (!req.user && req.path.startsWith('/api/') && !req.path.startsWith('/api/secure'))
    res.status(401).json({ error: 'Acccess Denied!' });
  else
    next();
});

app.use('/', express.static("./client"));
app.use('/node_modules', express.static("./node_modules"));

app.use('/api/todo/', todo);
app.use('/api/note/', note);
app.use('/api/library/', library);

app.use('/api/core/widgets/widgetDescriptor/', widgetDescriptor);
app.use('/api/core/widgets/widgetBoardItem/', widgetBoardItem);
app.use('/api/secure/', secure);

app.use(function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.listen(3000);