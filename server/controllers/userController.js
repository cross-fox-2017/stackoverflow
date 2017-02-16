const users = require('../models/users')

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
    user.findOrCreate({where: {
      username : username
    }, defaults: {
      password: password
    }}).spread(function(user, created) {
      console.log(user.get({
        plain: true
      }))
      if (created){
        res.json(user)
      } else {
        res.json({msg: "email or username already registered"})
      }
    }).catch(function(){
      res.json({msg: "register failed, password too short"})
    })
  },
  login: function(req, res){
    let username = req.body.username
    let password = req.body.password
    user.findOne({where: {username: username}}).then(function(data, err) {
      if(err) console.log(err)
      if(!data){
        res.json({msg: "Username not Found"})
      }
      if(hash.verify(password, data.dataValues.password)){
        res.json(data)
      } else {
        res.json({msg: "Incorrect Password"})
      }
    })
  }
}

module.exports = userController
