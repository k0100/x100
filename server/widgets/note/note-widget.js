var express = require('express');
var router = express.Router();
var Note = require('./note-schema');

router.post('/', function(req, res, next) {
	var command = req.body.commandName;
	console.log(req.user);
	if(command == 'list')
	{
		Note.find({
			userId: req.user._id},function(err, result) {
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
			date : note.date,
			userId: req.user._id

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
		Note.remove({ _id:note._id, userId: req.user._id}, function(err, result){
			if(err)
				throw err;
			res.json(result);	
		});
	}
});

module.exports = router;