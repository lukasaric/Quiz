'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./database');
const examRoutes = require('./routes/examRoutes');
const profileRoutes = require('./routes/profileRoutes');
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
app.use('/profile', authenticate, profileRoutes);
app.use('/topic', authenticate, examRoutes);

function handleError(err, req, res, next) {
  let message = '';
  if (err.status === 500) return res.status(500);
  if (err.name === 'AuthenticationError') message = 'User already exists.';
  if (err.name === 'SequelizeValidationError') message = 'Invalid input form.';
  res.status(401).send({ message });
}

sequelize.sync()
  .then(() => {
    app.listen(port);
    console.log(`Server started on port ${port}`);
  });
