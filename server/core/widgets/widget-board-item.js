var express = require('express');
var router = express.Router();
var WidgetBoardItem = require('./widget-board-item-schema');
var WidgetDescriptor = require('./widget-descriptor-schema');
var Promise = require('promise');

router.post('/', function (req, res, next) {
    var command = req.body.commandName;

    if (command == 'list') {
        var boardItems = WidgetBoardItem.find({
            userId: req.user._id,
        });

        var descriptors = WidgetDescriptor.find({
            userId: req.user._id,
        });


        // , function (err, result) {
        //     if (err)
        //         throw err;
        //     res.json(result);
        // });
        Promise.all([boardItems, descriptors])
            .then(function (data) {
                var items = data[0];
                var desc = data[1];

                var row = 0;
                var column = 0;
                //console.log(items);
                for (var index in items) {

                    var widgets = desc.filter(function (descriptor) {
                        return descriptor.row == row && descriptor.column == column;
                    });
                    //console.log(index,widgets);
                    items[index].descriptors = widgets;
                    column += items[index].usedColumns;

                    console.log(items[index]);//this.addDescriptor(descriptor);
                }

                res.json(items);
            });
    }

    if (command == 'init') {
        var index = 0;
        while (index < 4) {
            var widgetBoardItem = new WidgetBoardItem({
                userId: req.user._id,
                index: index,
                usedColumns: 1
            });
            widgetBoardItem.save();
            index++;
        }
    }
    //     newWidgetDescriptor.save(function (err, result) {
    //         if (err)
    //             throw err;
    //         res.json(result);
    //     });
    // }

    // if (command == 'delete') {
    //     var descriptor = req.body.data;

    //     WidgetDescriptor.remove({
    //         _id: descriptor._id,
    //         userId: req.user._id
    //     }, function (err, result) {
    //         if (err)
    //             throw err;
    //         res.json(result);
    //     });
    // }

    // if (command == 'reposition') {
    //     var descriptor = req.body.data;

    //     WidgetDescriptor.update({
    //         _id: descriptor._id,
    //         userId: req.user._id
    //     }, {
    //         $set: { column: descriptor.column, row: descriptor.row }
    //         }, function (err, result) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 res.json(result);
    //             }
    //         }
    //     );
    // }

    // if (command == 'setBackground') {
    //     var descriptor = req.body.data;

    //     WidgetDescriptor.update({
    //         _id: descriptor._id,
    //         userId: req.user._id
    //     }, {
    //         $set: { background: descriptor.background }
    //         }, function (err, result) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 res.json(result);
    //             }
    //         }
    //     );
    // }

    // if (command == 'setTitle') {
    //     var descriptor = req.body.data;

    //     WidgetDescriptor.update({
    //         _id: descriptor._id,
    //         userId: req.user._id
    //     }, {
    //         $set: { title: descriptor.title }
    //         }, function (err, result) {
    //             if (err) {
    //                 res.send(err);
    //             } else {
    //                 res.json(result);
    //             }
    //         }
    //     );
    // }
});

module.exports = router;

