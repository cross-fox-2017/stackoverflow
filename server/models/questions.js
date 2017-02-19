const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var questionSchema = new Schema({
  idUser:  [{
    type: Schema.Types.ObjectId,
    ref: "Users"
  }],
  title: String,
  description:String,
  idVote: [],
  idAnswers: [{
    type: Schema.Types.ObjectId,
    ref: "Answers"
  }]
},{
  timestamps: true
})

let Question = mongoose.model('Question',questionSchema)
module.exports = Question
