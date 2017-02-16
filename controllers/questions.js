const mongoose = require('mongoose')
const Questions = require('../models/questions')
const seedQuestions = require('../seeders/questions')

module.exports = {
  seed: (req, res) => {
    mongoose.connection.db.dropCollection('questions', (err, result) => {
      if (err) res.status(500).send(err)
      else {
        console.log('Dropped collection: Questions')
        Questions.create(seedQuestions, (err, questions) => {
          if (err) res.send(err)
          else res.send(questions)
        })
      }
    })
  },

  list: (req, res) => {
    Questions.find((err, questions) => {
      if (err) res.status(500).send(err)
      res.send(questions)
    })
  },

  add: (req, res) => {
    Questions.create({
      userId: Number(req.body.userId),
      title: req.body.title,
      answers: [],
      content: req.body.content,
      created_at: new Date(),
      updated_at: new Date()
    }, (err, question) => {
      if (err) res.send(err)
      res.send(question)
    })
  },

  remove: (req, res) => {
    Questions.findByIdAndRemove(req.params.id, (err, question) => {
      if (err) res.status(500).send(err)
      res.send(question)
    })
  },

  addAnswer: (req, res) => {
    Questions.findByIdAndUpdate(req.params.id, {
      $push: {
        'answers': {
          userId: Number(req.body.userID),
          content: req.body.content,
          upvote: [],
          downvote: []
        }
      }
    }, {
      new: true,
      upsert: true
    }, (err, data) => {
      if (err) res.send(err)
      else res.send(data)
    })
  },

  removeAnswer: (req, res) => {
    Questions.findByIdAndUpdate({ _id: req.params.id }, {
      $pull: {
        answer: {
          id: Number(req.body.id)
        }
      }
    }, {
      new: true
    }, (err, data) => {
      if (err) res.send(err)
      res.send(data)
    })
  },

  removeAllAnswer: (req, res) => {
    Questions.findByIdAndUpdate({ _id: req.params.id }, {
      answer: []
    }, {
      new: true
    }, (err, data) => {
      if (err) res.send(err)
      res.send(data)
    })
  },

  upvoteQuestion: (req, res) => {
    let upvoteCondition = true

    Questions.findOne({ _id: req.params.id }, (err, data) => {
      if (err) res.send(err)
      data.upvote.forEach(vote => {
        if (vote == req.body.id) {
          upvoteCondition = false
        }
      })
      if (upvoteCondition) {
        Questions.findByIdAndUpdate({ _id: req.params.id}, {
          $push: {
            upvote: Number(req.body.id) // USER ID who upvote the question
          }
        }, {
          new: true
        }, (err, vote) => {
          if (err) res.send(err)
          res.send(vote)
        })
      } else {
        res.send('You cannot upvote the same question again!')
      }
    })
  },

  downvoteQuestion: (req, res) => {
    let downvoteCondition = true

    Questions.findOne({ _id: req.params.id }, (err, data) => {
      if (err) res.send(err)
      data.downvote.forEach(vote => {
        if (vote == req.body.id) {
          downvoteCondition = false
        }
      })
      if (downvoteCondition) {
        Questions.findByIdAndUpdate({ _id: req.params.id }, {
          $push: {
            downvote: Number(req.body.id) // USER ID who downvote the question
          }
        }, {
          new: true
        }, (err, vote) => {
          if (err) res.send(err)
          res.send(vote)
        })
      } else {
        res.send('You cannot downvote the same question again!')
      }
    })
  },
  upvoteAnswer: (req, res) => {
    let answerCondition = true

    // res.send(upvoteCondition)
    Questions.findOne({ _id: req.params.id }, (err, data) => {
      if (err) res.send(err)
      console.log(data.answer[req.body.index].upvote)
      data.answer[req.body.index].upvote.forEach(vote => {
        if (vote == req.body.id) {
          answerCondition = false
        }
      })

      console.log(answerCondition)
      if (answerCondition) {
        Questions.findById(req.params.id, (err, question) => {
          console.log({question})

          question.answer[req.body.index].upvote.push(Number(req.body.id))

          question.save((err, question) => {
            if (err) res.send(err)
            res.send(question)
          })
        })
      } else {
        res.send('You cannot upvote the same answer again!')
      }
    })
  },

  downvoteAnswer: (req, res) => {
    let downvoteCondition = true

    Questions.findOne({ _id: req.params.id }, (err, data) => {
      if (err) res.send(err)
      data.downvote.forEach(vote => {
        if (vote == req.body.id) {
          downvoteCondition = false
        }
      })
      if (downvoteCondition) {
        Questions.findByIdAndUpdate({ _id: req.params.id }, {
          $push: {
            downvote: Number(req.body.id) // USER ID who downvote the question
          }
        }, {
          new: true
        }, (err, vote) => {
          if (err) res.send(err)
          res.send(vote)
        })
      } else {
        res.send('You cannot downvote the same question again!')
      }
    })
  },
  seedKey: (req, res, next) => {
    if (req.header('auth') === 'admin123') {
      next()
    } else {
      res.send('You dont have access!')
    }
  }
}
