const modelUser = require('../models/model.user.js')
const passwordHash = require('password-hash')
const jwt = require('jsonwebtoken')

var objUser = {
  getAllUser: function (req, res) {
    modelUser.find({}, function (err, data) {
      console.log('masuk get all user')
      res.json(data)
    })
  },
  getOneUser: function (req, res) {
    // search by username
    modelUser.findOne({ username: req.body.username }, function (err, data) {
      res.json(data)
    })
  },
  createOneUser: function (req, res) {
    modelUser.findOne({ username: req.body.username }, function (err, data) {
      if (err) throw err
      if (data) {
        res.json({msg: 'username already taken'})
      } else {
        // create a new user
        var newUser = modelUser({
          name: req.body.name,
          username: req.body.username,
          password: passwordHash.generate(req.body.password)
        })
        // save the user
        newUser.save(function (err, data) {
          if (err) throw err
          res.json(data)
        })
      }
    })
  },
  editOneUser: function (req, res) {},
  deleteOneUser: function (req, res) {},
  login: function (req, res) {
    console.log('masuk login')
    modelUser.findOne({ username: req.body.username }, function (err, data) {
      if (err) throw err
      // search username in database if not found will res username not found
      if (data) {
        // generate token
        if (passwordHash.verify(req.body.password, data.password)) {
          var token = jwt.sign({ username: data.username }, 'secret', { expiresIn: '1h' })
          res.json({msgCode: 1, token})
        }else {
          res.json({msgCode: 0, msg: 'worng password'})
        }
      }else {
        res.json({ msgCode: 0, msg: 'username not found' })
      }
    }) // end find
  } // end login
}

module.exports = objUser
