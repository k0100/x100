var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var Book = require('./book-schema');
var WidgetDescriptor = require('./../../core/widgets/widget-descriptor-schema');
var path = require('path');

var DIR = './uploads/';

var upload = multer({ dest: DIR }).single('file');

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

    var widgetQuery = WidgetDescriptor.find(
        {
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
            Book.find({
                widgetId: widget._id
            }, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        }

        if (command == 'delete') {
            var book = req.body.data;

            Book.remove({
                _id: book._id,
                widgetId: widget._id
            }, function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        }

        if (command == 'setpage') {
            var book = req.body.data;
            
            Book.update({
				_id: book._id,
				widgetId: widget._id
			}, {
					$set: { page: book.page }
				}, function (err, result) {
					if (err) {
						res.send(err);
					} else {
						res.json(result);
					}
				});
        }

        if (command == 'setzoom') {
            var book = req.body.data;
            
            Book.update({
				_id: book._id,
				widgetId: widget._id
			}, {
					$set: { zoom: book.zoom }
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


router.post('/upload', function (req, res) {
    if (!req.user) {
        res.json({ error: 'Bad User' });
        return;
    }

    upload(req, res, function (err) {
        var widgetId = JSON.parse(req.body.data).widgetId;

        if (!widgetId) {
            res.json(400, { error: 'Bad Widget' });
            return;
        }

        var widgetQuery = WidgetDescriptor.find(
            {
                _id: widgetId,
                userId: req.user._id
            }).exec();

        widgetQuery.then(function (found) {
            if (found.length !== 1) {
                res.json(400, { error: 'Bad Widget' });
                return;
            }

            const widget = found[0];

            if (err) {
                return res.end(err.toString());
            }

            console.log(req.file);
            var book = new Book({
                fileName: req.file.filename,
                name: req.file.originalname,
                size: req.file.size,
                date: new Date(),
                widgetId: widget._id,
                userId: req.user._id,
            });

            book.save(function (err, result) {
                if (err)
                    throw err;
                res.json(result);
            });
        });
    });
});

router.get('/upload', function (req, res) {

    var bookId = req.query.id;
    var widgetId = req.query.widgetId;

    if (!widgetId) {
        res.json(400, { error: 'Bad Widget' });
        return;
    }

    var widgetQuery = WidgetDescriptor.find(
        {
            _id: widgetId,
            userId: req.user._id
        }).exec();

    widgetQuery.then(function (found) {
        if (found.length !== 1) {
            res.json(400, { error: 'Bad Widget' });
            return;
        }

        const widget = found[0];

        Book.findOne({
            _id: bookId,
            widgetId: widget._id
        }, function (err, result) {
            if (err)
                throw err;

            var file = DIR + result.fileName;

            fs.exists(file, (exists) => {
                if (!exists) {
                    res.end("No file is found");
                } else {
                    // const audioBuffer = fetchAudioBuffer();
                    // res.set('Content-Type', 'audio/mp4');
                    // res.sendSeekable(audioBuffer);

                    res.sendFile( result.fileName, { root: path.join(__dirname, '../../../uploads') });
                    // fs.stat(file, function (error, stat) {
                    //     res.setHeader('Content-Length', stat.size);
                    //     res.setHeader("Content-Type", "application/pdf");
                    //     res.setHeader('Content-Disposition', 'inline; filename=quote.pdf');
                    //     res.sendFile(file);
                    //     //fs.createReadStream(file).pipe(res);
                    // });
                }
            });
        });
    });
});

module.exports = router;