var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	date: Date,
    fileName: String,
    name: String,
    size: Number,
    widgetId: String,
    userId: String
});

var schema = mongoose.model('BookSchema', bookSchema);
module.exports = schema;