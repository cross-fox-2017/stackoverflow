const models = require('../models')

module.exports = {
  getAnswersAll: (req, res) => {
    models.Answers.findAll({
      include: [
        {model: models.Vote_Answers}
      ]
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getAnswersByQuestionId: (req, res) => {
    models.Answers.findAll({
      where: {
        questionid: req.params.id
      },
      include: [
        {model: models.Vote_Answers}
      ]
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createAnswer: (req, res) => {
    models.Answers.create({
      content: req.body.content,
      userid: req.body.userid,
      questionid: req.body.questionid
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteAnswer: (req, res) => {
    models.Answers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateAnswer: (req, res) => {
    models.Answers.findById(req.params.id).then(function (answer) {
      answer.update({
        content: req.body.content
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
