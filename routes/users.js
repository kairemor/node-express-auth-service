const express = require('express');
const router = express.Router();
const authenticate = require('../authenticate');
const passport = require('passport');
const User = require('../models/user');


router.post('/signup', (req, res, next) => {
  User.register(new User({
    username: req.body.username
  }), req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        err: err
      });
    } else {
      passport.authenticate('local')(req, res, () => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          msg: 'Registration success',
          success: true
        });
      });
    }

  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = authenticate.getToken({
    _id: req.user._id
  });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({
    token: token,
    id: req.user._id,
  });
});

router.get('/me', authenticate.verifyUser, (req, res, next) => {
  res.json(req.user);
});

module.exports = router;