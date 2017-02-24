`use strict`
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  email: String,
},
{
  timestamps: true
})

var User = mongoose.model('User', userSchema)

module.exports = User
