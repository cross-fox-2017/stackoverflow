const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const questionSchema = new Schema({
  userId: {
    type: Number,
    ref: 'users'
  },
  title: String,
  answers: [{
    userId: Number,
    content: String,
    upvote: [],
    downvote: [],
    createdAt: Date,
    updatedAt: Date
  }],
  content: String,
  upvote: Array,
  downvote: Array,
  createdAt: Date,
  updatedAt: Date
}, { strict: false })

questionSchema.plugin(autoIncrement.plugin, 'questions')
module.exports = mongoose.model('questions', questionSchema)
