'use strict';

const {Exam} = require('../database/index');

exports.getHistory = function (req, res) {
  const where = { user_fk: req.user.id };
  Exam.findAll({ where })
    .then(data => res.send(data));
};
