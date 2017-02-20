var express = require('express');
var router = express.Router();
const Answer = require('../controllers/answers')

/* GET home page. */

router.post('/add',Answer.add)

module.exports = router;
