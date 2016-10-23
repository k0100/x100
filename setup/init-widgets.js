var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/x100', ['widgetDescriptors']);
var ObjectId = mongojs.ObjectId;

var removeDescriptors = function (descriptors) {
    for (var i in descriptors) {
        //db.widgetDescriptors.remove({ _id: ObjectId(descriptors[i]._id) });
    }
}
var createDescriptors = function () {
    var descriptors = [
        {
            widgetTypeName: 'TodoComponent',
            column: 0,
            row: 0,
            windowState: { value: 1 },
            parameters: []
        },
        {
            widgetTypeName: 'NoteComponent',
            column: 0,
            row: 0,
            windowState: { value: 1 },
            parameters: []
        },
        {
            widgetTypeName: 'ClockComponent',
            column: 0,
            row: 0,
            windowState: { value: 1 },
            parameters: []
        }
    ];
    for (let i in descriptors) {
        db.widgetDescriptors.save(descriptors[i], function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Added compenent: " + descriptors[i].widgetTypeName);
            }
        });
    }
}
db.widgetDescriptors.find(function (err, result) {
    if (err) {
        console.log(err);
    } else {
        removeDescriptors(result);
        createDescriptors();
    }
});



