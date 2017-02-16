var express = require('express');
var router = express.Router();
var userController = require('../controller/userController')
var questionController = require('../controller/questionController')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', userController.signUp);

router.post('/signin', userController.signIn);

router.post('/verify', userController.verifyToken);

router.get('/question', questionController.findAll);

router.get('/question/:id', questionController.findById);

router.post('/question', function(req, res, next) {

});

router.put('/question/:id', function(req, res, next) {

});

router.delete('/question/:id', function(req, res, next) {

});

router.post('/question/:id', function(req, res, next) {

});

router.put('/question/:id', function(req, res, next) {

});

router.delete('/question/:id', function(req, res, next) {

});
module.exports = router;
