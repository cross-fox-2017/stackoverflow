var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
// var autoincrement = require('simple-mongoose-autoincrement');

var voteSchema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'Users' },
})

var answerSchema = new Schema({
  title: String,
  content: String,
  upvote: [voteSchema],
  downvote: [voteSchema],
  userid: { type: Schema.Types.ObjectId, ref: 'Users' }
})

var QuestionsSchema = new Schema({
  title: String,
  content: String,
  upvote: [voteSchema],
  downvote: [voteSchema],
  userid: { type: Schema.Types.ObjectId, ref: 'Users' },
  answer:[answerSchema]
})


var questions = mongoose.model('Questions', QuestionsSchema);

module.exports = questions
