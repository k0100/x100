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
                    column++;
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

        Promise
            .all([boardItems])
            .then(function (data) {
                var dbItems = data[0];
                var deleteIds = [];

                for (var i in dbItems) {

                    var foundItem = items.find(x => x._id == dbItems[i]._id);
                    //console.log(foundItem);
                    if (foundItem === undefined) {
                        deleteIds.push(dbItems[i]._id);
                    }
                }

                WidgetBoardItem.remove({ _id: { $in: deleteIds } },
                    function (err) { });

                for (var i in items) {
                    var currentItem = items[i];
                    if (currentItem._id !== "") {
                        WidgetBoardItem.update({
                            _id: currentItem._id,
                            userId: req.user._id
                        }, {
                                $set: { usedColumns: currentItem.usedColumns, index: currentItem.index }
                            }, function (err, result) {
                            }
                        );
                    }
                    else {
                        var newItem = new WidgetBoardItem({
                            userId: req.user._id,
                            index: currentItem.index,
                            usedColumns: currentItem.usedColumns,
                            itemTypeId: currentItem.itemType.id,
                            descriptors: []
                        }
                        );
                        newItem.save(function (err, result) {
                        });
                    }

                }
                res.json("ok");
            });
    }
});

module.exports = router;

