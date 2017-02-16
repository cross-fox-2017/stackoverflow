var express = require('express');
var router = express.Router();
const questionController = require('../controllers/questionController')

router.get('/', questionController.findAllQuestion)
router.get('/:id', questionController.findByQuestionId)
router.post('/', questionController.createQuestion)
router.put('/:id', questionController.updateQuestion)
router.delete('/:id', questionController.deleteQuestion)
router.post('/upvote/:id', questionController.questionUpvote)
router.post('/downvote/:id', questionController.questionDownvote)

router.post('/:id', questionController.createAnswer)

module.exports = router;
