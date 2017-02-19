const models = require('../models')

module.exports = {
  getQuestions: (req, res) => {
    models.Questions.findAll({
      include: [
        {model: models.Answers},
        {model: models.Vote_Questions},
        {model: models.Vote_Answers}
      ]
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  getQuestion: (req, res) => {
    models.Questions.findById(req.params.id).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createQuestion: (req, res) => {
    models.Questions.create({
      title: req.body.title,
      content: req.body.content,
      userid: req.body.userid
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteQuestion: (req, res) => {
    models.Questions.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateQuestion: (req, res) => {
    models.Questions.findById(req.params.id).then(function (question) {
      question.update({
        title: req.body.title,
        content: req.body.content
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
