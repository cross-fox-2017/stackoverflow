var models = require('../models/user')
var hash = require('password-hash')
var jwt = require('jsonwebtoken')

module.exports = {
  register: function (req, res) {
    let user = {
      name: req.body.name,
      username: req.body.username,
      password: hash.generate(req.body.password)
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
        username: req.body.username
      }
    ).then(function (data) {
      if (hash.verify(req.body.password, data.password)) {
        jwt.sign({ username: data.username } , process.env.SECRET, {}, function (err, token) {
          res.json({token: token})
          if (err)
            res.json({err: 'PARAMETER ke 3 / ALGORITMA JWT BELUM DIISI , masukan {} '})
        })
      }else {
        res.json({err: 'Password salah'})
      }
    }).catch(function (err) {
      res.json({err: err})
    })
  }

}

// jwt.sign({ foo: 'bar' }, secret, {}, function (err, token) {
//   console.log(token)
// })
