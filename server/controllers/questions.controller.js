const Question = require('../models/questions.model')
const mongoose = require('mongoose');


module.exports = {

  createQuestion : (req, res) => {
        var newQuestion = new Question({
          title     : req.body.title,
          question  : req.body.question,
          category  : req.body.category,
          postedBy:{
            username:req.params.username
          },
          upvote    : [],
          downvote  : [],
          answers   : []
      })
        newQuestion.save( (err) => {
          if(err) throw err
          res.send(newQuestion)
        })
    },

  showAllQuestion : (req, res) => {
    Question.find({}, (err,data) => {
      if(err) res.send(err)
      res.json(data)
    })
  },

  showQuestion : (req, res) => {
    Question.find({_id: req.params.id}, (err,data) => {
      res.json(data)
    })
  },

  addAnswer: function(req,res){
      Question.findOne({_id:req.params.id}, (err,data) => {
        if(err) res.send(err)
        else{
          data.answers.push(
            {
              _id     : mongoose.Types.ObjectId(),
              content : req.body.content,
              upvote    : [],
              downvote: [],
              postedBy: {
                username:req.params.username
              }
            }
          )
          data.markModified('answers')
          data.save(function(err){
              res.json(data)
          })
        }
      })
    },

    upvoteQuestion: function(req,res){
      voteQuestion("upvote", req.params.id, req.params.username,function(v){
        res.json(v)
      })
    },

    downvoteQuestion: function(req,res){
      voteQuestion("downvote", req.params.id, req.params.username,function(v){
        res.json(v)
      })
    },

    upvoteAnswer: function(req,res){
      voteAnswer("upvote", req.params.id, req.params.ansid, req.params.username,function(v){
        res.json(v)
      })
    },

    downvoteAnswer: function(req,res){
      voteAnswer("downvote", req.params.id, req.params.ansid, req.params.username,function(v){
        res.json(v)
      })
    }

}

function voteQuestion(upordown, id, username, cb) {
  var cek = false
  Question.findOne({_id:id}, (err, data) => {
    if (err) return error

    else{
      data[upordown].forEach( (voting) => {
        if(voting.username === username) cek = true
      })

      if(cek == false){
        data[upordown].push({username: username})
        data.markModified(upordown)
        data.save( (err) => {
            if (err) return cb(err)
            else     return cb(data)
        })
      }

    else return cb({err :'already vote!'})
    }
  })
}

function voteAnswer(upordown, id, ansId, username, cb) {
  var arr
  var cek = false
  Question.findOne({_id:id}, (err, data) => {
    data.answers.forEach( (x) =>{
      if(x._id == ansId) arr = x
    })
    console.log(arr);
      arr[upordown].forEach( (voting) => {
        if(voting.username == username){
          cek = true
        };
      })

      if(cek == false){
        arr[upordown].push({username: username})
        data.markModified('answers')
        data.save( (err) => {
          if (err) return cb(err)
          else     return cb(data)
        })
      }
      else return cb({err :'already vote!'})
  })
}
