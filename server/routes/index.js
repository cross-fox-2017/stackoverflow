var express = require('express')
var router = express.Router()
const userController = require('../controllers/users')
const questionController = require('../controllers/questions')
const answerController = require('../controllers/answers')
const voteAnswerController = require('../controllers/vote_answers')
const voteQuestionController = require('../controllers/vote_questions')

/* GET home page. */

router.get('/', function (req, res, next) {
  res.send('Go to http://localhost:8080/')
})

router.get('/auth', function (req, res, next) {
  res.send({
    endpoints: [
      '/auth/users/register',
      '/auth/users/login',
      '/auth/users',
      '/auth/users/:id'
    ]
  })
})

router.post('/auth/users/register', userController.createUser)

router.post('/auth/users/login', userController.verifyUser)

router.get('/auth/users', userController.getUsers)

router.put('/auth/users/:id', userController.updateUser)

router.delete('/auth/users/:id', userController.deleteUser)

router.get('/api', function (req, res, next) {
  res.send({
    endpoints: [
      '/api/questions',
      '/api/questions/:id',
      '/api/answers',
      '/api/answers/:id',
      '/api/voteanswers',
      '/api/voteanswers/:id',
      '/api/votequestions',
      '/api/votequestions/:id'
    ]
  })
})

// Questions

router.get('/api/questions', questionController.getQuestions)

router.get('/api/questions/:id', questionController.getQuestion)

router.post('/api/questions', questionController.createQuestion)

router.put('/api/questions/:id', questionController.updateQuestion)

router.delete('/api/questions/:id', questionController.deleteQuestion)

// Answers

router.get('/api/answers', answerController.getAnswersAll)

router.get('/api/answers/:id', answerController.getAnswersByQuestionId)

router.post('/api/answers', answerController.createAnswer)

router.put('/api/answers/:id', answerController.updateAnswer)

router.delete('/api/answers/:id', answerController.deleteAnswer)

// Vote Answers

router.get('/api/voteanswers', voteAnswerController.getVoteAnswers)

router.post('/api/voteanswers', voteAnswerController.createVoteAnswer)

router.put('/api/voteanswers/:id', voteAnswerController.updateVoteAnswer)

router.delete('/api/voteanswers/:id', voteAnswerController.deleteVoteAnswer)

// Vote Questions

router.get('/api/votequestions', voteQuestionController.getVoteQuestions)

router.post('/api/votequestions', voteQuestionController.createVoteQuestion)

router.put('/api/votequestions/:id', voteQuestionController.updateVoteQuestion)

router.delete('/api/votequestions/:id', voteQuestionController.deleteVoteQuestion)

module.exports = router
