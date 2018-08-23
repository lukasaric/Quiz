'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./database');
const createTest = require('./routes/createTest');
const profileStats = require('./routes/profileStats');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const cookieSession = require('cookie-session');
const app = express();
require('./controllers/AuthController');

const port = process.env.PORT;

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/profile', profileStats);
app.use('/topic', createTest);

sequelize.sync()
  .then(() => {
    app.listen(port);
    console.log(`Server started on port ${port}`);
  });
