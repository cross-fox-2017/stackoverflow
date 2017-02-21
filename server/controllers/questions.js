const modelsQuestion = require('../models/questions');
const modelsAnswers = require('../models/answers');

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
            if (err) {
                res.send(err)
            } else {
                res.send(result)
            }
        })
    },

    show: function(req, res, next) {
        modelsQuestion.find({}, function(err, data) {
            res.send(data)
        })
    },

    getQuestionDetail: function(req, res, next) {
        modelsQuestion.find({
            _id: req.body.idQuestions
        }).populate('idUser').populate('idAnswers').exec(function(err, data) {
            res.send(data)
        })
    },


    delete: function(req, res, next) {
        var arrId = JSON.parse(req.body.arrId)
        arrId.forEach(function(idArtikel) {
            modelsQuestion.findByIdAndRemove(idArtikel, function(err) {
                if (err) res.send(err)
            })
        })
        res.send({
            status: "Data Terhapus"
        })
    },
    update: function(req, res, next) {
        modelsQuestion.findOneAndUpdate({
            _id: req.body.id
        }, {
            title: req.body.title,
            isi: req.body.isi,
            author: req.body.author
        }, {
            new: true
        }).then(function(err, result) {
            if (err) res.send(err)
            else {
                res.send(result)
            }
        })
    },

    addAnswerToQuestions: function(req, res, next) {
        modelsQuestion.findOneAndUpdate({
            _id: req.body.idQuestions
        }, {
            $push: {
                idAnswers: req.body.idAnswers
            }
        }, {
            new: true
        }).then(function(result) {
            res.send(result)
        })
    },

    runVoteQuestion: function(req, res, next) {
        modelsQuestion.findOneAndUpdate({
            _id: req.body.inputIdQuestion
        }, {
            $push: {
                idVote: req.body.userID
            }
        }, {
            new: true
        }).then(function(result) {
            res.send(result)
        })
    },

    runDownVoteQuestion: function(req, res, next) {
        modelsQuestion.findById(req.body.inputIdQuestion,function(err, result) {
          if(err){
            res.send(err)
          }else{
            var indexiDVote = result.idVote.indexOf(req.body.userID)
            result.idVote.splice(indexiDVote,1)
            result.save(function(err, result) {
              if(err){
                res.send({
                  status: false,
                  data: err
                })
              }else {
                res.send({
                  status: true,
                  data: result
                })
              }
            })
          }
        })
    },


}

module.exports = Question
