'use strict';

const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.get('/:id', examController.createExam);
router.post('/submit', examController.submitExam);

module.exports = router;
