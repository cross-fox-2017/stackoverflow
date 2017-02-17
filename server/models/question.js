var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title: String,
    text: String,
    postedBy: Schema.Types.Mixed,
    answer: Schema.Types.Mixed,
    vote: Schema.Types.Mixed,
    downvote: Schema.Types.Mixed,
    createdAt:Date
});

var Question = mongoose.model("Question",questionSchema)
module.exports = Question
