var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/', function (req, res, next) {

  //fix local-passport limit of argument resolve
  req.body.email = req.body.data.email;
  req.body.password = req.body.data.password;

  var command = req.body.commandName;
  if (command == 'signup') {
    passport.authenticate('local-signup', function (error, user) {
     
      if (error) {
        res.statusCode = 400;
        return res.json(error);
      }
      req.login(user, function (error) {
        
        if (error) {
          res.statusCode = 400;
          return res.json(error);
        }
      });
      res.json(user);
    })(req, res, next);
  }

  if (command == 'signin') {
    passport.authenticate('local-signin', function (error, user) {
      if (error) {
        res.statusCode = 400;
        return res.json(error);
      }
      req.login(user, function (error) {
        if (error) {
          res.statusCode = 400;
          return res.json(error);
        }
      });
      res.json(user);
    })(req, res, next);
  }
});

module.exports = router;