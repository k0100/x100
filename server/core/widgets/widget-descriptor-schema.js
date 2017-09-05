var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var widgetDescriptorSchema = new Schema({
    userId: String,
    widgetTypeName: String,
    title: String,
    columnId: String,
    row: Number,
    background: String,
    windowState: { value: Number },
    parameters: [{ name: String, value: String }]
});

var schema = mongoose.model('WidgetDescriptorSchema', widgetDescriptorSchema);
module.exports = schema;