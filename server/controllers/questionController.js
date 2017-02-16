const questions = require('../models/questions')

const questionController = {
  findAllQuestion: function(req, res) {
    questions.find({}, function(err, questions){
      if (err) throw err;
      res.json(questions)
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
      res.json(newquestions)
    })
  },
  findByQuestionId: function (req, res){
    let id = req.params.id
    questions.findById(id, function(err, question){
      if (err) throw err;
      res.json(question)
    })
  },
  updateQuestion: function(req, res) {
    let id = req.params.id
    let content = req.body.content
    questions.findOneAndUpdate({_id: id}, {content: content}, {new: true}, function(err, question){
      if (err) throw err;
      res.json(question)
    })
  },
  deleteQuestion: function(req, res) {
    let id = req.params.id
    questions.findById(id, function(err, question) {
      if (err) throw err;
      if(!question){res.send('question not found')}
      question.remove(function(err) {
        if (err) throw err;
        res.json(question);
      });
    });
  },
  questionUpvote: function(req, res){
    let id = req.params.id
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
          res.json(question)
        })
      } else {
        res.send('already upvote')
      }
    })
  },
  questionDownvote: function(req, res){
    let id = req.params.id
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
          res.json(question)
        })
      } else {
        res.send('already downvote')
      }
    })
  },
  createAnswer: function(req, res) {
    let id = req.params.id
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
        res.json(question)
      })
    })
  },
  answerUpvote: function(req, res){
    let id = req.params.id
    let answerid = req.body.answerid
    let userid = req.body.userid
    questions.findById(id, function(err, question){
      question.answer.id(answerid).upvote.push({userid: userid})
      question.save(function(err){
        if(err) throw err;
        res.json(question)
      })
    })
  },
  answerDownvote: function(req, res){
    let id = req.params.id
    let answerid = req.body.answerid
    let userid = req.body.userid
    questions.findById(id, function(err, question){
      question.answer.id(answerid).upvote.push({userid: userid})
      question.save(function(err){
        if(err) throw err;
        res.json(question)
      })
    })
  }
}

module.exports = questionController
