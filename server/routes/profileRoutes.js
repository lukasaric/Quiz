'use strict';

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.getHistory);

module.exports = router;
