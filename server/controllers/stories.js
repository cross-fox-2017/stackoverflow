var User = require('../models/user')
var Stories = require('../models/stories')
var storyDetails = require('../models/story_details')
var jwt = require('jsonwebtoken')

module.exports = {
  newStories: function (req, res) {
    let request = {
      token: req.body.token,
      title: req.body.title,
      story: req.body.story
    }
    let decoded = jwt.verify(request.token, process.env.SECRET)

    let stories = {
      user_id: decoded.user_id,
      title_stories: request.title,
      story: request.story
    }

    Stories.create(stories).then(function (data) {
      res.json({success: data})
    }).catch(function (err) {
      res.json({err: err})
    })
  },

  newDetails: function (req, res) {
    let decoded = jwt.verify(req.body.token, process.env.SECRET)

    let comment = {
      comment: req.body.comment,
      comment_by: decoded.username
    }

    let stories = {
      _id: req.body.story_id
    }
    storyDetails.create(comment)
      .then(function (data) {
        Stories.findOne(stories)
          .populate('story_detail user_id')
          .then(function (result) {
            result.story_detail.push(data._id)
            result.save(function (err) {
              if (err) {
                res.json({err: 'error pas save'})
              } else {
                res.json({successdetail: data})
              }
            })
          }).catch(function (err) {
          res.json({err: err})
        })
      }).catch(function (err) {
      res.json({err: err})
    })
  },
  getAllStories: function (req, res) {
    Stories.find().populate('user_id').then(function (data) {
      res.json({success: data})
    }).catch(function (err) {
      res.json({err: err})
    })
  },
  getOneStory: function (req, res) {
    let storyid = req.params.id
    Stories.findOne({'_id': storyid}).populate('user_id story_detail').then(function (data) {
      res.json({success: data})
    }).catch(function (err) {
      res.json({err: err})
    })
  },
  upVoteStories: function (req, res) {},
  downVoteStories: function (req, res) {},
  upVoteDetails: function (req, res) {},
  downVoteDetails: function (req, res) {}
}
