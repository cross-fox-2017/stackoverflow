const mongoose = require('mongoose');
const Schema = mongoose.Schema

const questionSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  }
  title: String,
  answer: mongoose.Schema.Types.Mixed,
  content: String,
  vote: Number
})

module.exports = mongoose.model('questions', questionSchema)
