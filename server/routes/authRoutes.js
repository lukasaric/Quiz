'use strict';

const router = require('express').Router();
const passport = require('passport');
const googlePassport = passport.authenticate('google', {scope: ['profile']});
const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');
const templatePath = path.join(__dirname, '../views/Authenticated.mustache');

router.post('/register', passport.authenticate('register'), (req, res) => {
  res.send(req.user);
});

router.post('/login', passport.authenticate('login'), (req, res) => {
  res.send(req.user);
});

router.get('/google', googlePassport);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:8080/auth/authenticated');
});

router.get('/authenticated', (req, res) => {
  loadMustache(templatePath)
    .then(template => Mustache.render(template, { user: JSON.stringify(req.user.toJSON()) }))
    .then(html => res.send(html));
});

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

module.exports = router;
