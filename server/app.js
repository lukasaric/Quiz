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

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(passport.initialize());

app.use('/auth', authRoutes);
app.use('/profile', passport.authenticate('jwt', { session: false }), profileStats);
app.use('/topic', passport.authenticate('jwt', { session: false }), createTest);

sequelize.sync()
  .then(() => {
    app.listen(port);
    console.log(`Server started on port ${port}`);
  });
