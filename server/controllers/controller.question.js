const modelQuestion = require('../models/modal.question.js');

var controllerQuestion = {
  getAllQuestion: function(req, res){
    modelQuestion
      .find({})
      .populate('postBy')
      .exec(function (err, data) {
      if (err) return handleError(err)
      // else console.log({data})
      else res.json(data)
      // else res.send(data)
      })
  },
  createOneQuestion: function(req, res){
    var newQuestion = modelQuestion({
      postBy: req.body.userid,
      title: req.body.title,
      question: req.body.question
    })

    newQuestion.save(function(err, data){
      if (err) throw err
      res.json(data)
    })
  }
}

module.exports = controllerQuestion
