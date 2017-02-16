const express = require('express')
const router = express.Router()
const controller = require('../controllers/questions')

router.post('/seed', controller.seedKey, controller.seed)
router.post('/', controller.add)
router.get('/', controller.list)

router.post('/:questionId/answers/add', controller.addAnswer)
router.put('/:questionId/answers/:answerId/remove', controller.removeAnswer)
router.put('/:questionId/answers/removeAll', controller.removeAllAnswer)

router.put('/:questionId/upvote', controller.upvoteQuestion)
router.put('/:questionId/downvote', controller.downvoteQuestion)

router.put('/:questionId/answers/:answerId/upvote', controller.upvoteAnswer)
router.put('/:questionId/answers/:answerId/downvote', controller.downvoteAnswer)

module.exports = router
