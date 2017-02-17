var Question = require('../models/question')
var mongoose = require('mongoose');

function voteQ(updown,id,username,callback){
  var cek= false;
  Question.findOne({_id:id},function(err,v){
    if(err){
      return error('ga nemu')
    }
    else{

      v[updown].forEach(function(vot){
        if(vot.username===username){
          cek = true;
        }
      })
      if(cek === false){
        v[updown].push({username:username})
        v.markModified(updown)
        v.save(function(err){
          if(err){
            return callback(err)
          }
          else{
            return callback(v)
          }
        })
      }
      else{
        return callback('anda sudah vote')
      }
    }
  })
}

function voteA(updown,id,ansid,username,callback){
  var arr
  var check = false
  Question.findOne({_id:id},function(err,q){
    q.answer.forEach(function(a){
      if(a._id==ansid){
        arr = a
      }
    })
    arr[updown].forEach(function(v){
      if(v.username==username){
        check = true
      }
    })
    if(check==false){
      arr[updown].push({username: username})
      q.markModified('answer') //type data mixed must use markmodified to save because mongoose lose autodetect in this situation
      q.save(function(err){
        if(err){
          return callback(err)
        }
        else{
          return callback(q)
        }
      })
    }
    else{
      return callback('anda sudah vote')
    }
  })
}

module.exports={
  create: function(req,res){
    var newQuestion = new Question({
      title: req.body.title,
      text: req.body.text,
      postedBy:{
        username:req.params.username
      },
      answer:[],
      vote:[],
      downvote:[],
      createdAt:new Date()
    })
    newQuestion.save(function(err){
      if(err) throw err
      res.json(newQuestion)
    })
  },

  show: function(req,res){
    Question.find({_id:req.params.id},function(err,q)
    {
      if(err) throw err;
      res.json(q)
    })
  },

  showAll: function(req,res){
    Question.find().then(function(result){
      res.json(result)
    })
  },

  addAnswer: function(req,res){
    Question.findOne({_id:req.params.id},function(err,q){
      if(err){
        res.send(err)
      }
      else{
        q.answer.push(
          {
            _id:mongoose.Types.ObjectId(),
            text:req.body.text,
            vote:[],
            downvote:[],
            postedBy:{
              username:req.params.username
            }
          }
        )
        q.markModified('answer')
        q.save(function(err){
          if(err){
            res.send(err)
          }
          else{
            res.json(q)
          }
        })

      }
    })

  },

  voteQuestion: function(req,res){
    voteQ("vote",req.params.id,req.params.username,function(v){
      res.json(v)
    })
  },

  downvoteQuestion: function(req,res){
    voteQ("downvote",req.params.id,req.params.username,function(v){
      res.json(v)
    })
  },

  voteAnswer: function(req,res){
    voteA("vote",req.params.id,req.params.ansid,req.params.username,function(v){
      res.json(v)
    })
  },

  downvoteAnswer: function(req,res){
    voteA("downvote",req.params.id,req.params.ansid,req.params.username,function(v){
      res.json(v)
    })
  }


}
