const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var answerSchema = new Schema({
  textAnswer:String,
  idVote: []
},{
  timestamps: true
})

let Answers = mongoose.model('Answers',answerSchema)
module.exports = Answers
