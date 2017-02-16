var express = require('express');
var router = express.Router();

router.get('/', userController.findAll)
router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router;
