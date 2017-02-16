const users = require('../models/users')

const userController = {
  findAll: function(req, res) {
    res.send('ok')
  },
  login: function(req, res) {
    res.send('ok')
  },
  register: function(req, res) {
    res.send('ok')
  }
}

module.exports = userController
