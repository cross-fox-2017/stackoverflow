var express = require('express');
var router = express.Router();
var question = require('../controllers/questions.controller.js')

router.post('/create/:username',question.create)
router.get('/:id',question.show)
router.get('/',question.showAll)
router.put('/:id/addAnswer/:username',question.addAnswer)
router.put('/:id/voteq/:username',question.voteQuestion)
router.put('/:id/voteans/:ansid/:username',question.voteAnswer)
router.put('/:id/downvoteq/:username',question.downvoteQuestion)
router.put('/:id/downvoteans/:ansid/:username',question.downvoteAnswer)
router.delete('/',question.delete)
module.exports = router;
