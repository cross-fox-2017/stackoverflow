const models = require('../models')

module.exports = {
  getVoteQuestions: (req, res) => {
    models.Vote_Questions.findAll().then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  createVoteQuestion: (req, res) => {
    models.Vote_Questions.create({
      questionid: req.body.questionid,
      userid: req.body.userid,
      value: req.body.value
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  deleteVoteQuestion: (req, res) => {
    models.Vote_Questions.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.send(data)
    }).catch(function (err) {
      res.send(err)
    })
  },
  updateVoteQuestion: (req, res) => {
    models.Vote_Questions.findById(req.params.id).then(function (vote) {
      vote.update({
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
