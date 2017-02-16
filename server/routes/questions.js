var express = require('express');
var router = express.Router();
const questionController = require('../controllers/questionController')

router.get('/', questionController.findAllQuestion)
router.get('/:id', questionController.findByQuestionId)
router.post('/', questionController.createQuestion)
router.put('/:id', questionController.updateQuestion)
router.delete('/:id', questionController.deleteQuestion)
router.post('/:id/upvote', questionController.questionUpvote)
router.post('/:id/downvote', questionController.questionDownvote)

router.post('/:id/answer', questionController.createAnswer)
router.post('/answer/upvote', questionController.answerUpvote)
router.post('/answer/downvote', questionController.answerDownvote)

module.exports = router;
