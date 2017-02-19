var express = require('express');
var router = express.Router();
const Question = require('../controllers/questions')

/* GET home page. */

router.post('/add',Question.add)

router.get('/show',Question.show)

router.delete('/delete',Question.delete)

router.put('/update',Question.update)

module.exports = router;
