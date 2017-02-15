var Question = require('../models/question')

module.exports={
  create: function(req,res){
    var newQuestion = new Question({
      title: req.body.title,
      text: req.body.text,
      category: [req.body.category1,req.body.category2],
      postedBy:{
        username:req.params.username
      },
      answer:[],
      vote:0,
      createdAt:new Date()
    })

    newQuestion.save(function(err){
      if(err) throw err
      res.json(newQuestion)
    })
  },
  show: function(req,res){
    Question.find({_id:req.params.id},function(err,q){
      if(err) throw err;
      res.json(q)
    })
  },
  showAll: function(req,res){
    Question.find().then(function(result){
      res.send(result)
    })
  },
  addAnswer: function(req,res){
    Question.find({_id:req.params.id},function(err,q){
      q[0].update(
        {$push:{answer:{
          id:q[0].answer.length+1,
          text:req.body.text,
          vote:0,
          postedBy:{
            username:req.body.username
          }
        }}}
      ).then(function(result){
        res.json(result)
      })
    })

  }
}
