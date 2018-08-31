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
      if (err) {
        reject(err);
        return;
      }
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
          user: user
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) res.send(err);
        const token = createToken(user);
        const message = 'Successfully logged in.';
        return res.status(200).json({ user, token, message });
      });
    })(req, res);
  },
  googleLogin: (req, res) => {
    loadMustache(templatePath)
      .then(template => {
        const token = createToken(req.user);
        // const user = JSON.stringify(req.user.toJSON());
        return Mustache.render(template, { token });
      })
      .then(html => res.send(html));
  }
};
