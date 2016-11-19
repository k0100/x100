var express = require('express');
var router = express.Router();
var Todo = require('./todo-schema');

router.post('/', function(req, res, next) {
	var command = req.body.commandName;
	if(command == 'list')
	{
		Todo.find({},function(err, result) {
	        if (err) 
				throw err;
	        res.json(result);
	    });
	}

	if(command == 'create')
	{
        var todo = req.body.data;

	   var newTodo = new Todo({
			description : todo.description
		});

		newTodo.save(function(err, result){
			if(err) 
				throw err;
			res.json(result);
		});
	}

	if(command == 'delete')
	{
        var todo = req.body.data;

		Todo.remove({ _id:todo._id}, function(err, result){
			if(err)
				throw err;
			res.json(result);	
		});
	}
});
module.exports = router;