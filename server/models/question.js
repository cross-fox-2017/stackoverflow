`use strict`
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const questionSchema = new Schema({
  title: String,
  question: String,
},
{
  timestamps: true
})

var Question = mongoose.model('Question', questionSchema)

module.exports = Question
