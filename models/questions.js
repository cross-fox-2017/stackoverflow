const mongoose = require('mongoose');
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const questionSchema = new Schema({
  questionID: {
    type: Number,
    ref: 'questionID'
  },
  userID: {
    type: Number,
    ref: 'users'
  },
  title: String,
  answer: [{
    answerID: {
      type: Number,
      ref: 'answerID'
    },
    userID: Number,
    content: String,
    vote: Number
  }], // mongoose.Schema.Types.Mixed -> Any data type & any nested arrays of objects
  content: String,
  vote: Number
}, { strict: false })

questionSchema.plugin(autoIncrement.plugin, 'questions')
module.exports = mongoose.model('questions', questionSchema)
