var express = require('express');
var router = express.Router();
var Note = require('./note-schema');
var WidgetDescriptor = require('./../../core/widgets/widget-descriptor-schema');

router.post('/', function (req, res, next) {
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

	var widget = WidgetDescriptor.findById(widgetId).exec();
	widget.then(function (widget) {
		if (command == 'list') {
			Note.find({
				widgetId: widget._id,
				userId: req.user._id
			}, function (err, result) {
				if (err)
					throw err;
				res.json(result);
			});
		}

		if (command == 'create') {
			var note = req.body.data;
			var newNote = new Note({
				body: note.body,
				date: note.date,
				widgetId: widget._id,
				userId: req.user._id,
			});

			newNote.save(function (err, result) {
				if (err)
					throw err;
				res.json(result);
			});
		}

		if (command == 'delete') {
			var note = req.body.data;
			Note.remove({
				_id: note._id,
				widgetId: widget._id,
				userId: req.user._id,
			}, function (err, result) {
				if (err)
					throw err;
				res.json(result);
			});
		}
	});
});

module.exports = router;