var express = require('express');
var router = express.Router();
const controllerQuestion = require('../controllers/controller.question.js');

/* GET home page. */
router.get('/', controllerQuestion.getAllQuestion);

router.post('/', controllerQuestion.createOneQuestion);

module.exports = router;
