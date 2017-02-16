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
      createdAt: new Date(),
      updatedAt: new Date()
    }, (err, question) => {
      if (err) res.status(500).send(err)
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
          userId: Number(req.body.userId),
          content: req.body.content,
          upvote: [],
          downvote: [],
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    }, {
      new: true,
      upsert: true
    }, (err, data) => {
      if (err) res.status(500).send(err)
      else res.send(data)
    })
  },

  removeAllAnswer: (req, res) => {
    Questions.findByIdAndUpdate(req.params.id, {
      answers: []
    }, {
      new: true
    }, (err, data) => {
      if (err) res.status(500).send(err)
      res.send(data)
    })
  },

  removeAnswer: (req, res) => {
    Questions.findByIdAndUpdate(req.params.id, {
      $pull: {
        'answers': {
          _id: req.params.answerId
        }
      }
    }, {
      new: true,
      upsert: true
    }, (err, data) => {
      if (err) res.status(500).send(err)
      else res.send(data)
    })
  },

  upvoteQuestion: (req, res) => {
    let upvoteCondition = true

    Questions.findOne({ _id: req.params.id }, (err, data) => {
      if (err) res.status(500).send(err)
      data.upvote.forEach(vote => {
        if (vote == req.body.id) {
          upvoteCondition = false
        }
      })
      if (upvoteCondition) {
        Questions.findByIdAndUpdate(req.params.id, {
          $push: {
            upvote: Number(req.body.id) // USER ID who upvote the question
          }
        }, {
          new: true
        }, (err, vote) => {
          if (err) res.status(500).send(err)
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
      if (err) res.status(500).send(err)
      data.downvote.forEach(vote => {
        if (vote == req.body.id) {
          downvoteCondition = false
        }
      })
      if (downvoteCondition) {
        Questions.findByIdAndUpdate(req.params.id, {
          $push: {
            downvote: Number(req.body.id) // USER ID who downvote the question
          }
        }, {
          new: true
        }, (err, vote) => {
          if (err) res.status(500).send(err)
          res.send(vote)
        })
      } else {
        res.send('You cannot downvote the same question again!')
      }
    })
  },

  upvoteAnswer: (req, res) => {
    let answerCondition = true
    let answerObj

    Questions.findOne({ _id: req.params.id }, (err, data) => {
      if (err) res.status(500).send(err)

      data.answers.forEach(answer => {
        if (answer._id == req.params.answerId) {
          answerObj = answer
        }
      })

      answerObj.upvote.forEach(upvote => {
        if (upvote == req.body.id) {
          answerCondition = false
        }
      })

      if (answerCondition) {
        answerObj.upvote.push(Number(req.body.id))
        data.save((err, result) => {
          if (err) res.status(500).send(err)
          else res.send(result)
        })
      } else {
        res.send('You cannot upvote the same answer again!')
      }
    })
  },

  downvoteAnswer: (req, res) => {
    let answerCondition = true
    let answerObj

    Questions.findOne({ _id: req.params.id }, (err, data) => {
      if (err) res.status(500).send(err)

      data.answers.forEach(answer => {
        if (answer._id == req.params.answerId) {
          answerObj = answer
        }
      })

      answerObj.downvote.forEach(downvote => {
        if (downvote == req.body.id) {
          answerCondition = false
        }
      })

      if (answerCondition) {
        answerObj.downvote.push(Number(req.body.id))
        data.save((err, result) => {
          if (err) res.status(500).send(err)
          else res.send(result)
        })
      } else {
        res.send('You cannot downvote the same answer again!')
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
