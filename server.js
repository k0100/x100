var express = require('express')
var todo = require('./server/widgets/todo');
var note = require('./server/widgets/note');
var widgetDescriptor = require('./server/core/widgets/widget-descriptor');
var bodyParser = require('body-parser');

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use('/',express.static("./client"));
app.use('/node_modules',express.static("./node_modules"));
app.use('/api/todo/', todo);
app.use('/api/note/', note);
app.use('/api/core/widgets/widgetDescriptor/', widgetDescriptor);

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.listen(3000)