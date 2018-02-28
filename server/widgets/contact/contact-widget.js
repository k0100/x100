var express = require('express');
var router = express.Router();
var Contact = require('./contact-schema');
var WidgetDescriptor = require('./../../core/widgets/widget-descriptor-schema');
var path = require('path');

router.post('/', function (req, res) {

    var command = req.body.commandName;
    var widgetId = req.body.data.widgetId;

    if (!req.user) {
        res.json({ error: 'Bad User' });
        return;
    }

    if (!widgetId) {
        res.json(400, { error: 'Bad Widget' });
        return;
    }

    var widgetQuery = WidgetDescriptor.find({
        _id: widgetId,
        userId: req.user._id
    }).exec();

    widgetQuery.then(function (found) {
        if (found.length !== 1) {
            res.json(400, { error: 'Bad Widget' });
            return;
        }

        const widget = found[0];

        if (command == 'list') {
            Contact.find({
                widgetId: widget._id
            }, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        }

        if (command == 'create') {
            var contact = req.body.data;
            var newContact = new Contact({
                name: contact.name,
                date: contact.date,
                note: contact.note,
                birthday: contact.birthday,
                phones: contact.phones,
                widgetId: widget._id,
                userId: req.user._id,
            });

            newContact.save(function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        }

        if (command == 'delete') {
            var contact = req.body.data;

            Contact.remove({
                _id: contact._id,
                widgetId: widget._id
            }, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        }
    });
});

module.exports = router;