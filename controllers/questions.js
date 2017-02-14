const mongoose = require('mongoose')
const Questions = require('../models/questions')
const seedQuestions = require('../seeders/questions')

module.exports = {
  seedQuestions: (req, res) => {
    mongoose.connection.db.dropCollection('questions', (err, result) => {
      if (err) throw err
      console.log('Dropped collection: Questions')
    })
    Questions.create(seedQuestions, (err, questions) => {
      if (err) throw err
      res.json(questions)
    })
  },
  addQuestion: (req, res) => {
    arrayOfAnswer = JSON.parse(req.body.answer)
    Questions.create({
      userID: req.body.userID,
      title: req.body.title,
      answer: arrayOfAnswer,
      content: req.body.content,
      vote: req.body.vote
    }, (err, question) => {
      if (err) throw err
      res.json(question)
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
