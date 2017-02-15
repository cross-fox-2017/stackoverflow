var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title: String,
    text: String,
    category:Schema.Types.Mixed,
    postedBy: Schema.Types.Mixed ,
    answer: Schema.Types.Mixed,
    vote:Number,
    createdAt:Date
});

var Question = mongoose.model("Question",questionSchema)
module.exports = Question
