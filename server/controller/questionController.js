const User = require('../models/question')

module.exports = {
  findAll: function (req, res, next) {
    User.find({}).then(function (users) {
      res.send(users)
    })
  },

  findById: function (req, res, next) {
    User.find({_id : req.body.id }).then(function (users) {
      res.send(users)
    })
  }

}
