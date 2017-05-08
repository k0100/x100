var express = require('express');
var router = express.Router();
var WidgetDescriptor = require('./widget-descriptor-schema');

router.post('/', function (req, res, next) {
    var command = req.body.commandName;
    if (command == 'list') {
        WidgetDescriptor.find({
            userId: req.user._id,
        }, function (err, result) {
            if (err)
                throw err;
            res.json(result);
        });
    }

    if (command == 'create') {
        var descriptor = req.body.data;

        var newWidgetDescriptor = new WidgetDescriptor({
            userId: req.user._id,
            widgetTypeName: descriptor.widgetTypeName,
            row: descriptor.row,
            column: descriptor.column,
            windowState: descriptor.windowState,
            parameters: descriptor.parameters
        });

        newWidgetDescriptor.save(function (err, result) {
            if (err)
                throw err;
            res.json(result);
        });
    }

    // if (command == 'delete') {
    //     var descriptor = req.body.data;

    //     db.widgetDescriptors.remove({ _id: ObjectId(descriptor._id) }, function (err, result) {
    //         if (err) {
    //             res.send(err);
    //         } else {
    //             res.json(result);
    //         }
    //     });
    // }

    // if (command == 'reposition') {
    //     var descriptor = req.body.data;

    //     db.widgetDescriptors.update({ _id: ObjectId(descriptor._id) },
    //         { $set: { column: descriptor.column, row: descriptor.row } }, function (err, result) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 res.json(result);
    //             }
    //         });
    // }
});

module.exports = router;
