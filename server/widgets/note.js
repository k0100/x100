var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/x100', ['notes']);
var ObjectId = mongojs.ObjectId;

router.post('/', function(req, res, next) {
	var command = req.body.commandName;
	if(command == 'list')
	{
		db.notes.find(function(err, notes) {
	        if (err) {
	            res.send(err);
	        } else {
	            res.json(notes);
	        }
	    });
	}

	if(command == 'create')
	{
        var note = req.body.data;

	    db.notes.save(note, function(err, result) {
		if (err) {
            res.send(err);
        	} else {
            res.json(result);
        	}
	    });
	}

	if(command == 'delete')
	{
        var note = req.body.data;

	    db.notes.remove({_id:ObjectId(note._id)}, function(err, result) {
		if (err) {
            res.send(err);
        	} else {
            res.json(result);
        	}
	    });
	}
});

module.exports = router;