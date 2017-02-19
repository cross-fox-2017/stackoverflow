
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    title         : { type: String, required: true} ,
    question      : String ,
    category      : String ,
    postedBy      : Schema.Types.Mixed,
    upvote        : Schema.Types.Mixed,
    downvote      : Schema.Types.Mixed,
    answers       : Schema.Types.Mixed
},
{  timestamps : true });

module.exports = mongoose.model("Question",questionSchema)
