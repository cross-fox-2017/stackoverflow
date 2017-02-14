const mongoose = require('mongoose');
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const userSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: 'userID'
  },
  username: String,
  password: String
})

userSchema.plugin(autoIncrement.plugin, 'users')
module.exports = mongoose.model('users', userSchema)
