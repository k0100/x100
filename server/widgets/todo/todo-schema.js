var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    description: String,
    isCompleted: Boolean,
    widgetId: String
});

var schema = mongoose.model('TodoSchema', todoSchema);
module.exports = schema;