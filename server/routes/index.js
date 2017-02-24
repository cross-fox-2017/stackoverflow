var express = require('express');
var router = express.Router();
var userController = require('../controller/userController')
var questionController = require('../controller/questionController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('index', { title: 'Express' });
});

router.post('/signup', userController.signUp);

router.post('/signin', userController.signIn);

router.post('/verify', userController.verifyToken);

router.get('/question', questionController.findAllQuestion);

router.post('/question', questionController.createQuestion);

module.exports = router;
