const modelsQuestion = require('../models/questions');

var Question = {
  add: function(req, res, next) {
    var addQuestion = new modelsQuestion({
      idUser: req.body.idUser,
      title: req.body.title,
      description: req.body.description,
      idVote: [],
      idAnswers: []
    })
    addQuestion.save(function(err, result) {
        if(err){
          res.send(err)
        }else{
          res.send(result)
        }
    })
  },

  show: function(req, res, next) {
    modelsQuestion.find({},function(err, data) {
        res.send(data)
    })
  },
  delete: function(req, res, next) {
    var arrId = JSON.parse(req.body.arrId)
    arrId.forEach(function(idArtikel) {
      modelsQuestion.findByIdAndRemove(idArtikel, function(err) {
          if(err)res.send(err)
      })
    })
    res.send({
        status: "Data Terhapus"
    })
  },
  update: function(req, res, next) {
    modelsQuestion.findOneAndUpdate({
      _id: req.body.id
    },{
      title: req.body.title,
      isi: req.body.isi,
      author: req.body.author
    },{
      new: true
    }).then(function(err, result) {
        if(err)res.send(err)
        else {
          res.send(result)
        }
    })
  }

}

module.exports = Question
