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


}

module.exports = Answer
