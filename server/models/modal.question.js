// grab the things we need
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// create a schema
var questionSchema = new Schema({
    postBy: { type: Schema.ObjectId, ref: 'User' },
    title: { type: String, required: [true, 'title is required'] },
    question: { type: String, required: [true, 'question is required'] },
    votes: [{ type: Schema.ObjectId, ref: 'User' }],
    answers: [{
            createdBy: { type: Schema.ObjectId, ref: 'User'},
            answer: { type: String, required: true },
            answerVotes: [{type: Schema.ObjectId, ref: 'User'}]
        }]
}, {
    timestamps: true
})

// the schema is useless so far
// we need to create a model using it
var Question = mongoose.model('Question', questionSchema)

// make this available to our question in our Node applications
module.exports = Question
