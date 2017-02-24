const Quest = require('../models/question')

module.exports = {
  findAllQuestion: function (req, res, next) {
    Quest.find({})
    .exec(function (err, data) {
    if (err) return handleError(err)
    else res.json(data)
    })
  },

  createQuestion: function(req, res){
    var newQuest = Quest({
      title: req.body.title,
      question: req.body.question
    })

    newQuest.save(function(err, data){
      if (err) throw err
      res.json(data)
    })
  }

}
