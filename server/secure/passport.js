var express = require('express');
var router = express.Router();
var passport = require('passport');
var WidgetBoardItem = require('../core/widgets/widget-board-item-schema');

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

      var index = 0;
      while (index < 5) {
        var widgetBoardItem = new WidgetBoardItem({
          userId: user._id,
          index: index,
          usedColumns: 1,
          itemTypeId: index < 4 ? 1 : 2
        });
        widgetBoardItem.save();
        index++;
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