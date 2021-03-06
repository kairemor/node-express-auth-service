const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const config = require('./config/config');

exports.local = passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
  return jwt.sign(user, config.secretKey,  { expiresIn: '1h' });
};

const options = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey
};

exports.jwtPassport = passport.use(new jwtStrategy(options, (payload, done) => {
  User.findOne({
    _id: payload._id
  }, (err, user) => {
    if (err) {
      return done(err, false);
    } else if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));

exports.verifyUser = passport.authenticate('jwt', {
  session: false
});

exports.verifyAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    const err = new Error('admin needed');
    next(err);
  }
};
