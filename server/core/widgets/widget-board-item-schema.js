var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var widgetBoardItemSchema = new Schema({
    userId: String,
    index: Number,
    usedColumns: Number
});

var schema = mongoose.model('WidgetBoardItemSchema', widgetBoardItemSchema);
module.exports = schema;