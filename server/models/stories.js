var mongoose = require('mongoose')
var Schema = mongoose.Schema

var storiesSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  title_stories: String,
  story: String,
  story_detail: [{
    type: Schema.Types.ObjectId,
    ref: 'Story_details'
  }],
  votes: [{
    type: String
  }]
})

var stories = mongoose.model('Stories', storiesSchema)

module.exports = stories
