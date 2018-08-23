'use strict';

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_STORAGE,
  logging: false
});

const db = {
  Answer: sequelize.import('./models/answer'),
  Question: sequelize.import('./models/question'),
  Topic: sequelize.import('./models/topic'),
  Test: sequelize.import('./models/test'),
  User: sequelize.import('./models/user')
};

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize;
module.exports = db;
