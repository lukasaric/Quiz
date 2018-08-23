'use strict';

const {Test} = require('../database/index');

exports.getHistory = function (req, res) {
  if (req) {
    Test.findAll({
      where: {
        user_fk: req.user.id
      }
    })
      .then(data => {
        res.send(data);
      });
  } else {
    res.send('Please log in to check your profile');
  }
};
