const mongoose = require('mongoose')
const Users = require('../models/users')
const passwordHash = require('password-hash')

module.exports = {
  addUser: (req, res) => {
    Users.create({
      username: req.body.username,
      password: passwordHash.generate(req.body.password)
    }, (err, user) => {
      if (err) throw err
      res.json(user)
    })
  }
}
