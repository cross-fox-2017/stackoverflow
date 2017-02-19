var express = require('express');
var router  = express.Router();
var controller = require('../controllers/users.controller.js')

// GET all users
router.get('/', controller.verifyUser, controller.getAllUser)
// CREATE user
router.post('/signup', controller.createUser)
// UPDATE user
router.put('/:id', controller.verifyUser, controller.updateUser)
// DELETE user
router.delete('/:id', controller.verifyUser, controller.deleteUser)

// LOGIN user
router.post('/login', controller.login)

module.exports = router;
