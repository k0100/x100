var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/x100', ['widgetDescriptors']);
var ObjectId = mongojs.ObjectId;

router.post('/', function (req, res, next) {
    var command = req.body.commandName;
    if (command == 'list') {
        db.widgetDescriptors.find(function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }

    if (command == 'create') {
        var descriptor = req.body.data;

        db.widgetDescriptors.save(descriptor, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }

    if (command == 'delete') {
        var descriptor = req.body.data;

        db.widgetDescriptors.remove({ _id: ObjectId(descriptor._id) }, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }

    if (command == 'reposition') {
        var descriptor = req.body.data;

        db.widgetDescriptors.update({ _id: ObjectId(descriptor._id) },
            { $set: { column: descriptor.column, row: descriptor.row } }, function (err, result) {
                if (err) {
                    res.send(err);
                } else {
                    res.json(result);
                }
            });
    }
});

module.exports = router;
