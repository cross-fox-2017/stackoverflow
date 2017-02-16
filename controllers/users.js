const mongoose = require('mongoose')
const Users = require('../models/users')
const passwordHash = require('password-hash')
const seedUsers = require('../seeders/users')

module.exports = {
  seed: (req, res) => {
    mongoose.connection.db.dropCollection('users', (err, result) => {
      if (err) res.status(500).send(err)
      else {
        console.log('Dropped collection: Users')
        Users.create(seedUsers, (err, users) => {
          if (err) res.status(500).send(err)
          else res.send(users)
        })
      }
    })
  // Users.create(seedUsers, (err, users) => {
  //   if (err) res.status(500).send(err)
  //   else res.send(users)
  // })
  },

  seedKey: (req, res, next) => {
    if (req.header('auth') === 'admin123') {
      next()
    } else {
      res.send('You dont have access!')
    }
  },

  add: (req, res) => {
    Users.create({
      username: req.body.username,
      password: passwordHash.generate(req.body.password),
      createdAt: new Date(),
      updatedAt: new Date()
    }, (err, user) => {
      if (err) res.status(500).send(err)
      else res.send(user)
    })
  },

  list: (req, res) => {
    Users.find((err, users) => {
      if (err) res.status(500).send(err)
      else res.send(users)
    })
  },

  remove: (req, res) => {
    Users.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) res.status(500).send(err)
      else res.send(user)
    })
  }
}
