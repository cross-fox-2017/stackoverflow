var express = require('express')
var router = express.Router()
const controllerUser = require('../controllers/controller.user.js')
const verify = require('../helpers/helper.verifToken.js')

/* get all user | http://localhost:3000/api/users/ */
router.get('/', verify.verify, controllerUser.getAllUser)
/* get one user by username http://localhost:3000/api/users/'your username' */
router.get('/:username', controllerUser.getOneUser)
/* create new user : http://localhost:3000/api/users/ */
router.post('/', controllerUser.createOneUser)
/* edit one user | http://localhost:3000/api/users/ */
router.put('/', controllerUser.editOneUser)
/* delete one user | http://localhost:3000/api/users/ */
router.delete('/', controllerUser.deleteOneUser)
/* create new user : http://localhost:3000/api/users/login */
router.post('/login', controllerUser.login)

module.exports = router
