var models = require('../models/user')
var hash = require('password-hash')
var jwt = require('jsonwebtoken')

module.exports = {
  register: function (req, res) {
    let user = {
      name: req.body.registername,
      username: req.body.registerusername,
      password: hash.generate(req.body.registerpassword)
    }

    models.create(user)
      .then(function (data) {
        res.json({data: data})
      }).catch(function (err) {
      res.json({err: err})
    })
  },

  login: function (req, res) {
    models.findOne(
      {
        username: req.body.loginusername
      }
    ).then(function (data) {
      if (hash.verify(req.body.loginpassword, data.password)) {
        var token = jwt.sign({user_id: data._id, username: data.username } , process.env.SECRET, {})

        res.json({token: token})
      }else {
        res.json({err: 'wrong password'})
      }
    }).catch(function (err) {
      res.json({err: "Username doesn't exist"})
    })
  }

}

// jwt.sign({ foo: 'bar' }, secret, {}, function (err, token) {
//   console.log(token)
// })
