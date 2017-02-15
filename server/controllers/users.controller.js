var User = require('../models/user')
var jwt = require('jsonwebtoken')
module.exports ={
  register: function(req,res){
    var newUser = new User({
      username: req.body.username,
      password:req.body.password
    })

    newUser.save(function(err){
      if(err){
        throw err
      }
      else{
        res.send(newUser)
      }
    })
  },
  login: function(req,res){
    User.find({username:req.body.username}).then(function(user){
      if(!user){
        res.json({ success: false, message: 'Authentication failed. no such username.' });
      }
      else if(user[0].password !== req.body.password){
        res.json({ success: false, message: 'Authentication failed. Wrong password.',users:user[0].password});
      }
      else{
        var token = jwt.sign({id:user._id,username:user.username}, 'superSecret',{expiresIn: 60*60})

        res.json(
          {
            success: true,
            token: token

          }
        );

      }
    })
  },
  delete: function(req,res){
    User.findOneAndRemove({username:req.params.id}, function(err) {
        if (err) throw err;

      res.send(`user deleted`);
    });
  }

}
