var express = require('express');
var router = express.Router();
var question = require('../controllers/questions.controller.js')

router.post('/create/:username',question.create)
router.get('/:id',question.show)
router.get('/',question.showAll)
router.put('/addAnswer/:id',question.addAnswer)

module.exports = router;
