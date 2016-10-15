var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/x100', ['todos']);
var ObjectId = mongojs.ObjectId;

router.post('/', function(req, res, next) {
	var command = req.body.commandName;
	if(command == 'list')
	{
		db.todos.find(function(err, todos) {
	        if (err) {
	            res.send(err);
	        } else {
	            res.json(todos);
	        }
	    });
	}

	if(command == 'create')
	{
        var todo = req.body.data;

		//console.log("saving ... "+todo);
	    db.todos.save(todo, function(err, result) {
		if (err) {
            res.send(err);
        	} else {
            res.json(result);
        	}
	    });
	}

	if(command == 'delete')
	{
        var todo = req.body.data;

		console.log("saving ... "+todo);
	    db.todos.remove({_id:ObjectId(todo._id)}, function(err, result) {
		if (err) {
            res.send(err);
        	} else {
            res.json(result);
        	}
	    });
	}
	console.log('todo');
});

module.exports = router;