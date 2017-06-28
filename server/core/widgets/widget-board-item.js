var express = require('express');
var router = express.Router();
var WidgetBoardItem = require('./widget-board-item-schema');

router.post('/', function (req, res, next) {
    var command = req.body.commandName;

    if (command == 'list') {
        WidgetBoardItem.find({
            userId: req.user._id,
        }, function (err, result) {
            if (err)
                throw err;
            res.json(result);
        });
    }

    if (command == 'init') {
        let index = 0;
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
