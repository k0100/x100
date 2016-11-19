var express = require('express');
var router = express.Router();
var Note = require('./note-schema');

router.post('/', function(req, res, next) {
	var command = req.body.commandName;
	if(command == 'list')
	{
		Note.find({},function(err, result) {
	        if (err) 
				throw err;
	        res.json(result);
	    });
	}

	if(command == 'create')
	{
        var note = req.body.data;
		var newNote = new Note({
			body : note.body,
			date : note.date
		});

		newNote.save(function(err, result){
			if(err) 
				throw err;
			res.json(result);
		});
	}

	if(command == 'delete')
	{
        var note = req.body.data;
		Note.remove({ _id:note._id}, function(err, result){
			if(err)
				throw err;
			res.json(result);	
		});
	}
});

module.exports = router;