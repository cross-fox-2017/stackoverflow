var express = require('express')
var router = express.Router()
const controllers = require('../controllers/stories')

/* GET users listing. */
router.post('/stories', controllers.newStories)
router.get('/stories', controllers.getAllStories)
router.post('/details', controllers.newDetails)
router.get('/stories/:id', controllers.getOneStory)

module.exports = router
