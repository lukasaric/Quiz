'use strict';

const passport = require('passport');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');
const templatePath = path.join(__dirname, '../views/Authenticated.mustache');

function createToken(user, expiresIn = '2d') {
  return jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn });
}

function loadMustache(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

module.exports = {
  login: (req, res) => {
    passport.authenticate('login', { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : 'Login failed.',
          user
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) res.send(err);
        const token = createToken(user);
        const userCredentials = { id: user.id, email: user.email };
        user = Object.assign({}, userCredentials, { token });
        const message = 'Successfully logged in.';
        return res.status(200).json({ user, message });
      });
    })(req, res);
  },
  googleLogin: (req, res) => {
    loadMustache(templatePath)
      .then(template => {
        const token = createToken(req.user);
        return Mustache.render(template, { token });
      })
      .then(html => res.send(html))
      .catch(err => res.send(err));
  }
};
