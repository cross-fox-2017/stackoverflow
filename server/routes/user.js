var express = require('express');
var router = express.Router();
const Users = require('../controllers/users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/login',Users.login)

router.post('/api/register',Users.register)

router.delete('/api/delete',Users.delete)

module.exports = router;
