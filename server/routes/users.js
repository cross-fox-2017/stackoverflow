
var express = require('express');
var router = express.Router();
var user = require('../controllers/users.controller.js')

router.post('/register',user.register)
router.post('/login',user.login)
router.delete('/delete/:id',user.delete)

module.exports = router;
