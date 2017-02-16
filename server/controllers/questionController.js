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
      vote: 0,
      userid: req.body.userid,
      answer: []
    }
    let newquestions = questions(data)
    newquestions.save(function(err){
      if(err) throw err;
      res.json({
        msg: 'question Created!',
        book: newquestions
      })
    })
  },
  updateQuestion: function(req, res) {
    res.send('ok')
  },
  deleteQuestion: function(req, res) {
    res.send('ok')
  },
  createAnswer: function(req, res) {
    let data = {
      title: req.body.title,
      content: req.body.content,
      vote: 0,
      userid: req.body.userid
    }
    let newbooks = books(data)
    newbooks.save(function(err){
      if(err) throw err;
      res.json({
        msg: 'book Created!',
        book: newbooks
      })
    })
  }
}

module.exports = questionController
