var express = require('express');
var router = express.Router();
const questionController = require('../controllers/questionController')

router.get('/', questionController.findAllQuestion)
router.get('/:questionid', questionController.findByQuestionId)
router.post('/', questionController.createQuestion)
router.put('/:questionid', questionController.updateQuestion)
router.delete('/:questionid', questionController.deleteQuestion)
router.post('/:questionid/upvote', questionController.questionUpvote)
router.post('/:questionid/downvote', questionController.questionDownvote)

router.post('/:questionid/answer', questionController.createAnswer)
router.post('/:questionid/answer/:answerid/upvote', questionController.answerUpvote)
router.post('/:questionid/answer/:answerid/downvote', questionController.answerDownvote)

module.exports = router;
