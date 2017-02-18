const mongoose = require('mongoose')
const Users = require('../models/users')
const passwordHash = require('password-hash')
const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')
const seedUsers = require('../seeders/users')

module.exports = {
  seed: (req, res) => {
    Users.remove(err => {
      if (err) res.status(500).send(err)
      else console.log('Dropped collection: Users')
    })
    Users.create(seedUsers, (err, users) => {
      if (err) res.status(500).send(err)
      else res.send(users)
    })
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
  },

  signin: (req, res) => {
    Users.findOne({ username: req.body.username }, (err, user) => {
      if (err) res.status(500).send(err)

      if (!passwordHash.verify(req.body.password, user.password)) {
        res.json({
          msg: 'Invalid Password!'
        })
      } else {
        let myToken = jwt.sign({
          id: user._id,
          username: user.username
        }, 'secret', {
          expiresIn: '24h'
        })
        res.json({
          id: user._id,
          token: myToken
        })
      }
    })
  }
}
