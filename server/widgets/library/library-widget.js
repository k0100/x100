var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');

var DIR = './uploads/';

var upload = multer({ dest: DIR }).single('file');

router.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end(err.toString());
        }

        res.end('File is uploaded');
    });
});

router.get('/upload', function (req, res) {
    var file = DIR + "1.pdf";
    fs.exists(file, (exists) => {
        if (!exists) {
            res.end("No file is found");
        } else {
            res.setHeader("content-type", "application/pdf");
            fs.createReadStream(file).pipe(res);
        }
    })
});

module.exports = router;