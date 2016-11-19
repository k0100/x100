var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    description: String
});

var schema = mongoose.model('TodoSchema', todoSchema);
module.exports = schema;