var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	date: Date,
    name: String,
    widgetId: String,
    userId: String,
    note: String,
    birthday: Date,
    phones: []
});

var schema = mongoose.model('ContactSchema', bookSchema);
module.exports = schema;