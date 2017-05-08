var express = require('express');
var router = express.Router();
var Note = require('./note-schema');

router.post('/', function (req, res, next) {
	var command = req.body.commandName;
	var widgetId = req.body.widgetId;
	if (!req.user) {
		res.json({ error: 'Bad User' });
		return;
	}

	if (!widgetId) {
		res.json(400, { error: 'Bad Widget' });
		return;
	}

	if (command == 'list') {
		Note.find({
			userId: req.user._id,
			widgetId: widgetId
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
			userId: req.user._id,
			widgetId: widgetId

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
			userId: req.user._id,
			widgetId: widgetId
		}, function (err, result) {
			if (err)
				throw err;
			res.json(result);
		});
	}
});

module.exports = router;