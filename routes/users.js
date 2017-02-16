const express = require('express')
const router = express.Router()
const controller = require('../controllers/users')

router.post('/seed', controller.seedKey, controller.seed)
router.post('/', controller.add)
router.get('/', controller.list)
router.delete('/:id', controller.remove)

module.exports = router
