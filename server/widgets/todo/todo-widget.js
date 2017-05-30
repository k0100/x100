var express = require('express');
var router = express.Router();
var Todo = require('./todo-schema');
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

	var widget = WidgetDescriptor.find(
		{
			_id: widgetId,
			userId: req.user._id
		}).exec();
		
	widget.then(function (found) {
		if (found.length !== 1) {
			res.json(400, { error: 'Bad Widget' });
			return;
		}
		
		let widget = found[0];

		if (command == 'list') {
			Todo.find({
				widgetId: widget._id
			}, function (err, result) {
				if (err)
					throw err;
				res.json(result);
			});
		}

		if (command == 'create') {
			var todo = req.body.data;
			var newTodo = new Todo({
				description: todo.description,
				widgetId: widget._id,
				userId: req.user._id
			});

			newTodo.save(function (err, result) {
				if (err)
					throw err;
				res.json(result);
			});
		}

		if (command == 'delete') {
			var todo = req.body.data;

			Todo.remove({
				_id: todo._id,
				widgetId: widget._id
			}, function (err, result) {
				if (err)
					throw err;
				res.json(result);
			});
		}

		if (command == 'toggle') {
			var todo = req.body.data;

			Todo.update({
				_id: todo._id,
				widgetId: widget._id
			}, {
					$set: { isCompleted: todo.isCompleted }
				}, function (err, result) {
					if (err) {
						res.send(err);
					} else {
						res.json(result);
					}
				});
		}
	});
});
module.exports = router;