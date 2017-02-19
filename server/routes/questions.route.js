var express = require('express');
var router  = express.Router();
var controller = require('../controllers/questions.controller.js')
var user    = require  ('../controllers/users.controller.js')

// GET all questions
router.get('/', controller.showAllQuestion)
router.get('/:id', controller.showQuestion)
router.post('/create/:username', controller.createQuestion)
router.put('/:id/answer/:username', controller.addAnswer)
router.put('/:id/upvoteq/:username',controller.upvoteQuestion)
router.put('/:id/upvoteq/:username',controller.upvoteQuestion)
router.put('/:id/downvoteq/:username',controller.downvoteQuestion)
router.put('/:id/upvoteans/:ansid/:username', controller.upvoteAnswer)
router.put('/:id/downvoteans/:ansid/:username', controller.downvoteAnswer)

// // UPDATE user
// router.put('/:id', controller.verifyUser, controller.updateUser)
// // DELETE user
// router.delete('/:id', controller.verifyUser, controller.deleteUser)

// LOGIN user
// router.post('/login', controller.login)

module.exports = router;
