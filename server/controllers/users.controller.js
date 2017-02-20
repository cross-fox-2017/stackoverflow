var User = require('../models/user')
var jwt = require('jsonwebtoken')

module.exports ={
  register: function(req,res){
    var newUser = new User({
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      username: req.body.username,
      password:req.body.password
    })
    newUser.save(function(err){
      if(err){
        res.send(err)
      }
      else{
        res.json(newUser)
      }
    })
  },

  login: function(req,res){
    User.find({username: req.body.username}).then(function(user){

      if(!user){
        res.json({ success: false, message: 'Authentication failed. no such username.' });
      }
      else if(user && user[0].password !== req.body.password){
        res.json({ success: false, message: 'Authentication failed. Wrong password.'});
      }
      else if(user && user[0].password===req.body.password){
        var token = jwt.sign({id:user._id,username:user.username}, 'superSecret',{expiresIn: 60*60})
        res.json(
          {
            success: true,
            token: token,
            user: user[0].username
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
  },

  decode: function(req,res){
    jwt.verify(req.body.token,'superSecret',function(err,tok){
      if(err){
        res.send('error')
      }
      else{
        res.json(tok)
      }
    })
  }

}
