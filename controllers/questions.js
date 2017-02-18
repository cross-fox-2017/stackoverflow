const mongoose = require('mongoose')
const Questions = require('../models/questions')
const seedQuestions = require('../seeders/questions')

module.exports = {
  seed: (req, res) => {
    // mongoose.connection.db.dropCollection('questions', (err, result) => {
    //   if (err) res.status(500).send(err)
    //   else {
    //     console.log('Dropped collection: Questions')
    //     Questions.create(seedQuestions, (err, questions) => {
    //       if (err) res.send(err)
    //       else res.send(questions)
    //     })
    //   }
    // })
    Questions.create(seedQuestions, (err, questions) => {
      if (err) res.send(err)
      else res.send(questions)
    })
  },

  list: (req, res) => {
    Questions.find((err, questions) => {
      if (err) res.status(500).send(err)
      else res.send(questions)
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
      else res.send(question)
    })
  },

  remove: (req, res) => {
    Questions.findByIdAndRemove(req.params.id, (err, question) => {
      if (err) res.status(500).send(err)
      else res.send(question)
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
      new: true
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
      else res.send(data)
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
    let convertId = Number(req.body.id)

    Questions.findOne({ _id: req.params.id }, (err, data) => {
      if (err) res.status(500).send(err)
      if(!data) {
        res.send('Question ID not found!')
      }
      data.upvote.forEach(vote => {
        if (vote == req.body.id) {
          upvoteCondition = false
        }
      })
      if (upvoteCondition) {
        Questions.findByIdAndUpdate(req.params.id,
          { $push: { upvote: convertId } },
          { new: true }, (err, vote) => {
            if (err) res.status(500).send(err)
            res.send(vote)
        })
      } else {
        Questions.findByIdAndUpdate(req.params.id,
          { $pull: { upvote: convertId } },
          { new: true }, (err, vote) => {
            if (err) res.status(500).send(err)
            res.send(vote)
        })
      }
    })
  },

  downvoteQuestion: (req, res) => {
    let downvoteCondition = true
    let convertId = Number(req.body.id)

    Questions.findOne({ _id: req.params.id }, (err, data) => {
      if (err) res.status(500).send(err)
      if(!data) {
        res.send('Question ID not found!')
      }
      data.downvote.forEach(vote => {
        if (vote == req.body.id) {
          downvoteCondition = false
        }
      })

      if (downvoteCondition) {
        Questions.findByIdAndUpdate(req.params.id,
          { $push: { downvote: convertId } },
          { new: true }, (err, vote) => {
            if (err) res.status(500).send(err)
            res.send(vote)
        })
      } else {
        Questions.findByIdAndUpdate(req.params.id,
          { $pull: { downvote: convertId } },
          { new: true }, (err, vote) => {
            if (err) res.status(500).send(err)
            res.send(vote)
        })
      }
    })
  },

  upvoteAnswer: (req, res) => {
    let answerCondition = true
    let convertId = Number(req.body.id)
    let answerObj, arr

    Questions.findOne({ _id: req.params.id }, (err, data) => {
      if (err) res.status(500).send(err)
      if(!data) {
        res.send('Question ID not found!')
      }

      // find an answer ID within a question by answerID
      data.answers.forEach(answer => {
        if (answer._id == req.params.answerId) {
          answerObj = answer
        }
      })

      // Check if the User ID already exist in the vote array
      // If exist set condition to false
      answerObj.upvote.forEach(upvote => {
        if (upvote == req.body.id) {
          answerCondition = false
        }
      })

      if (answerCondition) {
        answerObj.upvote.push(convertId)
        data.save((err, result) => {
          if (err) res.status(500).send(err)
          else res.send(result)
        })
      } else {
        arr = answerObj.upvote.filter(vote => vote !== convertId)

        // set the filtered array into answerObj upvote and save it!
        answerObj.upvote = arr
        data.save((err, result) => {
          if (err) res.status(500).send(err)
          else res.send(result)
        })
      }
    })
  },

  downvoteAnswer: (req, res) => {
    let answerCondition = true
    let convertId = Number(req.body.id)
    let answerObj, arr

    Questions.findOne({ _id: req.params.id }, (err, data) => {
      if (err) res.status(500).send(err)
      if(!data) {
        res.send('Question ID not found!')
      }

      // find an answer ID within a question by answerID
      data.answers.forEach(answer => {
        if (answer._id == req.params.answerId) {
          answerObj = answer
        }
      })

      // Check if the User ID already exist in the vote array
      // If exist set condition to false
      answerObj.downvote.forEach(downvote => {
        if (downvote == req.body.id) {
          answerCondition = false
        }
      })

      if (answerCondition) {
        answerObj.downvote.push(convertId)

        data.save((err, result) => {
          if (err) res.status(500).send(err)
          else res.send(result)
        })
      } else {
        arr = answerObj.downvote.filter(vote => vote !== convertId)

        // set the filtered array into answerObj downvote and save it!
        answerObj.downvote = arr
        data.save((err, result) => {
          if (err) res.status(500).send(err)
          else res.send(result)
        })
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
