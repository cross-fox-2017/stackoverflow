var express = require('express');
var router = express.Router();
const Answer = require('../controllers/answers')

/* GET home page. */

router.post('/add',Answer.add)

router.put('/runVoteAnswer', Answer.runVoteAnswer)

router.put('/runDownVoteAnswer', Answer.runDownVoteAnswer)

router.get('/show',Answer.show)

module.exports = router;
