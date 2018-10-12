'use strict';

const express = require('express');
const router = express.Router();
const examController = require('../controllers/examController');

router.get('/:id', examController.createTest);
router.post('/submit', examController.submitTest);

module.exports = router;
