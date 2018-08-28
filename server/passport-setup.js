'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./database').User;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user));
});

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}, (payload, done) => {
  return User.findOne({ id: payload.sub })
    .then(user => {
      return done(null, user);
    })
    .catch(err => done(err));
}));

passport.use('register', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, (email, password, done) => {
  const where = { email };
  User.findOne({ where })
    .then(user => {
      if (user) {
        return done(null, false, { message: 'Email is already taken.' });
      }
      User.create({ email, password })
        .then(user => done(null, user))
        .catch(err => {
          if (err.name === 'SequelizeValidationError') {
            return done(null, false, { message: 'Invalid input form.' });
          }
          done(err);
        });
    });
}));

passport.use('login', new LocalStrategy({
  usernameField: 'email'
}, (username, password, done) => {
  const where = { email: username };
  User.findOne({ where })
    .then(async user => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isValidPassword = await user.comparePassword(password, user.password);
      if (isValidPassword) return done(null, user);
      done(null, false, { message: 'Incorrect password.' });
    })
    .catch(err => done(err));
}));

passport.use(
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    const where = { googleId: profile.id };
    const defaults = { ...where, username: profile.displayName };
    User.findOrCreate({ where, defaults })
      .spread(user => done(null, user))
      .catch(error => done(error, false, error.message));
  })
);
