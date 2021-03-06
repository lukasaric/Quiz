'use strict';

const router = require('express').Router();
const passport = require('passport');
const AuthController = require('../controllers/AuthController');
const googlePassport = passport.authenticate('google', {scope: ['profile']});

router.post('/register',
  passport.authenticate('register', { failWithError: true }), (req, res) => {
    res.status(200).send(req.user);
  });

router.post('/login', AuthController.login);

router.get('/google', googlePassport);

router.get('/google/redirect',
  passport.authenticate('google', { session: false }), (req, res) => {
    res.redirect('http://localhost:8080/auth/authenticated');
  });

router.get('/authenticated', AuthController.googleLogin);

module.exports = router;
