const users = require('../models/users')
const hash = require('password-hash')
const jwt = require('jsonwebtoken');

const userController = {
  findAll: function(req, res) {
    users.find({}, function(err, users){
      if (err) throw err;
      res.json(users)
    })
  },
  register: function(req, res){
    let username = req.body.username
    let password = hash.generate(req.body.password)
    users.findOne({username: username}, function(user){
      if(!user){
        let register = users({
          username: username,
          password: password
        })
        register.save(function(err){
          if(err) throw err;
          res.json(register)
        })
      } else {
        res.send('Username already registered')
      }
    })
  },
  login: function(req, res){
    let username = req.body.username
    let password = req.body.password
    users.findOne({username: username}, function(err, data) {
      if(err) console.log(err)
      if(!data){
        res.json({msg: "Username not Found"})
      }
      if(hash.verify(password, data.password)){
        var token = jwt.sign({user: data.username}, process.env.SECRETJWT);
        res.send({token: token, userid: data._id})
      } else {
        res.json({msg: "Incorrect Password"})
      }
    })
  }
}

module.exports = userController
