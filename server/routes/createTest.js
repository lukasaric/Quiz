'use strict';

const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.get('/:id', testController.createTest);
router.post('/submit', testController.submitTest);

module.exports = router;
