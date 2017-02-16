var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var autoincrement = require('simple-mongoose-autoincrement');

var QuestionsSchema = new Schema({
  title: String,
  content: String,
  userid: { type: Schema.Types.ObjectId, ref: 'Users' }
  answer:[
  {answerid: Number, title: String, content: String, upvote: Number}
  ]

})

QuestionsSchema.plugin(autoincrement, {field: 'answerid'});
var questions = mongoose.model('Questions', QuestionsSchema);

module.exports = questions
