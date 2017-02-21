var express = require('express');
var router = express.Router();
const Question = require('../controllers/questions')
const Answer = require('../controllers/answers');

/* GET home page. */

router.post('/add',Question.add)

router.get('/show',Question.show)

router.post('/getQuestionDetail',Question.getQuestionDetail)

router.delete('/delete',Question.delete)

router.put('/update',Question.update)

router.put('/addAnswerToQuestions', Question.addAnswerToQuestions)

router.put('/runVoteQuestion', Question.runVoteQuestion)

router.put('/runDownVoteQuestion', Question.runDownVoteQuestion)
module.exports = router;
