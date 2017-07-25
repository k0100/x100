var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var WidgetDescriptor = require('./widget-descriptor-schema');

var widgetBoardItemSchema = new Schema({
    userId: String,
    index: Number,
    usedColumns: Number,
    itemTypeId: Number,
    descriptors: []
});

var schema = mongoose.model('WidgetBoardItemSchema', widgetBoardItemSchema);
module.exports = schema;