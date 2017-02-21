const modelsAnswer = require('../models/answers');

var Answer = {
  add: function(req, res, next) {
    var addAnswer = new modelsAnswer({
      textAnswer: req.body.textAnswer,
      idVote: []
    })
    addAnswer.save(function(err, result) {
        if(err){
          res.send(err)
        }else{
          res.send(result)
        }
    })
  },
  runVoteAnswer: function(req, res, next) {
    modelsAnswer.findOneAndUpdate({
      _id: req.body.inputIdAnswer
    },{
      $push:{
        idVote: req.body.userID
      }
    },{
      new: true
    }).then(function(result) {
        res.send(result)
    })
  },

  runDownVoteAnswer: function(req, res, next) {
      modelsAnswer.findById(req.body.inputIdAnswer,function(err, result) {
        if(err){
          res.send(err)
        }else{
          var indexiDVote = result.idVote.indexOf(req.body.userID)
          result.idVote.splice(indexiDVote,1)
          result.save(function(err, result) {
            if(err){
              res.send({
                status: false,
                data: err
              })
            }else {
              res.send({
                status: true,
                data: result
              })
            }
          })
        }
      })
  },
  show: function(req, res, next) {
      modelsAnswer.find({}, function(err, data) {
          res.send(data)
      })
  },


}

module.exports = Answer
