const express = require('express');
const router = express.Router();
const userController = require('../controllers/users')
const questionController = require('../controllers/questions')

router.post('/questions/seed', questionController.seedKey, questionController.seedQuestions)
router.post('/questions', questionController.addQuestion)

router.post('/users', userController.addUser)

module.exports = router;
