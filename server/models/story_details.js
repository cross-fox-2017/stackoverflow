var mongoose = require('mongoose')
var Schema = mongoose.Schema

var story_detailSchema = new Schema({
  comment: String,
  comment_by: String,
  votes: [{
    type: String
  }]
})

var story_detail = mongoose.model('Story_details', story_detailSchema)

module.exports = story_detail
