'use strict';

const fs = require('fs');
const db = require('./index');

let topics = [];
let answers = [];
let questions = [];

loadJson('questions.json')
  .then(data => {
    topics = readTopics(data);
    questions = data.map(it => ({ ...it, text: it.question }));
  })
  .then(() => db.sequelize.sync({ force: true }))
  .then(() => db.Topic.bulkCreate(topics, { validate: true }))
  .then(models => {
    const topics = {};
    models.forEach(({ id, type }) => (topics[type] = id));
    questions.forEach(it => (it.topic_fk = topics[it.topic]));
  })
  .then(() => db.Question.bulkCreate(questions, { validate: true }))
  .then(models => {
    questions.forEach((question, i) => {
      // eslint-disable-next-line camelcase
      const question_fk = models[i].id;
      answers = answers.concat(question.answers.map(it => ({
        ...it,
        question_fk
      })));
    });
  })
  .then(() => db.Answer.bulkCreate(answers, { validate: true }))
  .then(() => db.sequelize.close())
  .then(() => console.log('Database shut down'));

function readTopics(questions) {
  const topics = questions.map(question => question.topic);
  return unique(topics).map(type => ({ type }));
}

function unique(arr) {
  return Array.from(new Set(arr));
}

function loadJson(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data));
    });
  });
}
