'use strict';

const uniqueRandom = require('unique-random');
const { Topic } = require('../database');
const { Answer } = require('../database');
const { Exam } = require('../database');
const { Question } = require('../database');
const Promise = require('bluebird');

const createArray = (length, callback) => Array.from({ length }, callback);

exports.createTest = async function (req, res) {
  const examDb = await Exam.create({
    topic_fk: req.params.id,
    user_fk: req.user.id
  });
  return createTest(req.params.id)
    .then(test => {
      const exam = { test, examId: examDb.id };
      res.send(exam);
    });
};

exports.submitTest = async function (req, res) {
  calculateResult(req.body.examArray, req.user.id)
    .then(questions => {
      res.send(questions);
      const checkedIds = [];
      questions.forEach((el, i) => {
        checkedIds[i] = el.answers.map(answer => answer.answerId);
      });
      saveResult(questions, req.user.id, req.body.examId, checkedIds);
    });
};

function calculateResult(data, id) {
  return Promise.map(data, question => {
    const answerIds = question.answers.map(answer => answer.answerId);
    const where = { id: answerIds };
    return Answer.findAll({ where })
      .map((model, i) => {
        const answer = question.answers[i];
        answer.correct = model.correctIndex === answer.index;
        return answer;
      })
      .then(answers => {
        question.answers = answers;
        return question;
      })
      .then(question => {
        question.result = 0;
        question.answers.forEach(answer => {
          if (answer.correct === true) {
            question.result = question.result + 1 / question.answers.length;
          }
        });
        return question;
      });
  });
}

function saveResult(questions, userId, examId, checkedAnswersIds) {
  let finalScore = 0;
  questions.forEach(question => {
    finalScore += question.result * 20;
  });
  const where = { id: questions[0].questId };
  Question.findOne({ where })
    .then(question => {
      Exam.update({
        topic_fk: question.topic_fk,
        finalScore
      }, { where: { user_fk: userId, id: examId } });
    });
}

function createTest(topicId, numberOfQuestions = 5) {
  return Topic.findById(topicId)
    .then(topic => topic.getQuestions())
    .then(questions => {
      const rand = uniqueRandom(0, questions.length - 1);
      return createArray(numberOfQuestions, () => questions[rand()]);
    })
    .map(question => question.loadAnswers({ attributes: ['id', 'text'] }));
}
