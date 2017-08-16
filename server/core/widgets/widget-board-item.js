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
        }).sort('index');

        var descriptors = WidgetDescriptor.find({
            userId: req.user._id,
        });

        Promise.all([boardItems, descriptors])
            .then(function (data) {
                var items = data[0];
                var desc = data[1];

                var row = 0;
                var column = 0;

                for (var index in items) {

                    var widgets = desc.filter(function (descriptor) {
                        return descriptor.column == column;
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

    if (command == 'synchronize') {
        var boardItems = WidgetBoardItem.find({
            userId: req.user._id,
        }).sort('index');

        var items = req.body.data;

        Promise.all([boardItems])
            .then(function (data) {
                var internalItems = data[0];

                // for (var i in items) {
                //     if (internalItems.length - 1 >= i) {
                //         var item = internalItems[i];
                //         item.usedColumns = items[i].usedColumns;

                //         //save the item
                //         WidgetBoardItem.update({
                //             _id: item._id,
                //             userId: req.user._id
                //         }, {
                //                 $set: { usedColumns: item.usedColumns }
                //             });
                //     }
                // }
                


                //console.log(data[0]);
                console.log(items);

            });
    }
});

module.exports = router;

