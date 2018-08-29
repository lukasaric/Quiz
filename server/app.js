'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./database');
const createTest = require('./routes/createTest');
const profileStats = require('./routes/profileStats');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const app = express();
require('./passport-setup');

const port = process.env.PORT;
const authenticate = passport.authenticate('jwt', { session: false });

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/auth', authRoutes, handleError);
app.use('/profile', authenticate, profileStats);
app.use('/topic', authenticate, createTest);

function handleError(err, req, res, next) {
  if (err.name === 'AuthenticationError') {
    res.status(401).send({
      message: 'User already exists.'
    });
  } else if (err.name === 'SequelizeValidationError') {
    res.status(401).send({
      message: 'Invalid input form.'
    });
  }
}

sequelize.sync()
  .then(() => {
    app.listen(port);
    console.log(`Server started on port ${port}`);
  });
