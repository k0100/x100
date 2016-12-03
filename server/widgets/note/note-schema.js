var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
	date: Date,
    body: String
});

var schema = mongoose.model('NoteSchema', noteSchema);
module.exports = schema;