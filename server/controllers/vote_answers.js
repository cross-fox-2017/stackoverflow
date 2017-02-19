const models = require('../models')

module.exports = {
  getVoteAnswers: (req, res) => {
    models.Vote_Answers.findAll().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createVoteAnswer: (req, res) => {
    models.Vote_Answers.create({
      answerid: req.body.answerid,
      questionid: req.body.questionid,
      userid: req.body.userid,
      value: req.body.value
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteVoteAnswer: (req, res) => {
    models.Vote_Answers.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateVoteAnswer: (req, res) => {
    models.Vote_Answers.findById(req.params.id).then(function (vote) {
      vote.update({
        answerid: req.body.answerid,
        questionid: req.body.questionid,
        userid: req.body.userid,
        value: req.body.value
      }).then(function (data) {
        res.send(data)
      }).catch(function (err) {
        res.send(err)
      })
    })
  }
}
