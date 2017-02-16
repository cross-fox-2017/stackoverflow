var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var autoincrement = require('simple-mongoose-autoincrement');

var answerSchema = new Schema({
  answerid: Number,
  title: String,
  content: String,
  vote: Number,
  userid: { type: Schema.Types.ObjectId, ref: 'Users' }
})

var QuestionsSchema = new Schema({
  title: String,
  content: String,
  vote: Number,
  userid: { type: Schema.Types.ObjectId, ref: 'Users' },
  answer:[answerSchema]
})

QuestionsSchema.plugin(autoincrement, {field: 'answerid'});
var questions = mongoose.model('Questions', QuestionsSchema);

module.exports = questions
