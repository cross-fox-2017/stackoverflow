const mongoose = require('mongoose')
const Users = require('../models/users')
const passwordHash = require('password-hash')

module.exports = {
  add: (req, res) => {
    Users.create({
      username: req.body.username,
      password: passwordHash.generate(req.body.password)
    }, (err, user) => {
      if (err) res.status(500).send(err)
      else res.send(user)
    })
  }
}
