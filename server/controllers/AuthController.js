'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');
const templatePath = path.join(__dirname, '../views/Authenticated.mustache');

const signToken = user => {
  return jwt.sign({
    sub: user.id
  }, process.env.JWT_SECRET, { expiresIn: '2d' });
};

function loadMustache(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}

module.exports = {
  register: (req, res) => {
    passport.authenticate('register', () => {
      res.send(req.body);
    })(req, res);
  },
  login: (req, res) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Login failed.',
          user: user
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) res.send(err);
        const token = signToken(user);
        return res.json({ user, token });
      });
    })(req, res);
  },
  googleLogin: (req, res) => {
    loadMustache(templatePath)
      .then(template => Mustache.render(template, { user: JSON.stringify(req.user.toJSON()) }))
      .then(html => res.send(html));
  }
};
