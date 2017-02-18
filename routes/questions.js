const express = require('express')
const router = express.Router()
const controller = require('../controllers/questions')

router.post('/seed', controller.seedKey, controller.seed)
router.post('/', controller.add)
router.delete('/:id', controller.remove)
router.get('/', controller.list)
router.get('/:id', controller.getQuestion)

router.post('/:id/answers', controller.addAnswer)
router.put('/:id/answers', controller.removeAllAnswer)

router.put('/:id/answers/:answerId/remove', controller.removeAnswer)

router.put('/:id/upvote', controller.upvoteQuestion)
router.put('/:id/downvote', controller.downvoteQuestion)

router.put('/:id/answers/:answerId/upvote', controller.upvoteAnswer)
router.put('/:id/answers/:answerId/downvote', controller.downvoteAnswer)

module.exports = router
