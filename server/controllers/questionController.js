const questions = require('../models/questions')

const questionController = {
  findAllQuestion: function(req, res) {
    questions.find({}, function(err, questions){
      if (err) throw err;
      res.send(questions)
    })
  },
  createQuestion: function(req, res) {
    let data = {
      title : req.body.title,
      content: req.body.content,
      upvote: [],
      downvote: [],
      userid: req.body.userid,
      answer: []
    }
    let newquestions = questions(data)
    newquestions.save(function(err){
      if(err) throw err;
      res.send(newquestions)
    })
  },
  findByQuestionId: function (req, res){
    let id = req.params.questionid
    questions.findById(id, function(err, question){
      if (err) throw err;
      res.send(question)
    })
  },
  updateQuestion: function(req, res) {
    let id = req.params.questionid
    let content = req.body.content
    questions.findOneAndUpdate({_id: id}, {content: content}, {new: true}, function(err, question){
      if (err) throw err;
      res.send(question)
    })
  },
  deleteQuestion: function(req, res) {
    let id = req.params.questionid
    questions.findById(id, function(err, question) {
      if (err) throw err;
      if(!question){res.send('question not found')}
      question.remove(function(err) {
        if (err) throw err;
        res.send(question);
      });
    });
  },
  questionUpvote: function(req, res){
    let id = req.params.questionid
    let userid = req.body.userid
    questions.findById(id, function(err, question){
      let vote = false
      question.upvote.forEach(function(data){
        if (data.userid == userid){
          vote = true
        }
      })
      if (!vote){
        question.upvote.push({userid: req.body.userid})
        question.save(function(err){
          if(err) throw err;
          res.send(question)
        })
      } else {
        res.send('already upvote this question')
      }
    })
  },
  questionDownvote: function(req, res){
    let id = req.params.questionid
    let userid = req.body.userid
    questions.findById(id, function(err, question){
      let vote = false
      question.downvote.forEach(function(data){
        if (data.userid == userid){
          vote = true
        }
      })
      if (!vote){
        question.downvote.push({userid: req.body.userid})
        question.save(function(err){
          if(err) throw err;
          res.send(question)
        })
      } else {
        res.send('already downvote this question')
      }
    })
  },
  createAnswer: function(req, res) {
    let id = req.params.questionid
    let data = {
      title: req.body.title,
      content: req.body.content,
      downvote: [],
      upvote: [],
      userid: req.body.userid
    }
    questions.findById(id, function(err, question){
      question.answer.push(data)
      question.save(function(err){
        if(err) throw err;
        res.send(question)
      })
    })
  },
  answerUpvote: function(req, res){
    let questionid = req.params.questionid
    let answerid = req.params.answerid
    let userid = req.body.userid
    questions.findById(questionid, function(err, question){
      let vote = false
      question.answer.id(answerid).upvote.forEach(function(data){
        if (data.userid == userid){
          vote = true
        }
      })
      if (!vote){
        question.answer.id(answerid).upvote.push({userid: userid})
        question.save(function(err){
          if(err) throw err;
          res.send(question)
        })
      } else {
        res.send('already upvote this answer')
      }
    })
  },
  answerDownvote: function(req, res){
    let questionid = req.params.questionid
    let answerid = req.params.answerid
    let userid = req.body.userid
    questions.findById(questionid, function(err, question){
      let vote = false
      question.answer.id(answerid).downvote.forEach(function(data){
        if (data.userid == userid){
          vote = true
        }
      })
      if (!vote){
        question.answer.id(answerid).downvote.push({userid: userid})
        question.save(function(err){
          if(err) throw err;
          res.send(question)
        })
      } else {
        res.send('already downvote this answer')
      }
    })
  }
}

module.exports = questionController
