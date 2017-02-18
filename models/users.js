const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const userSchema = new Schema({
  username: String,
  password: String,
  createdAt: Date,
  updatedAt: Date
})

userSchema.plugin(autoIncrement.plugin, 'users')
module.exports = mongoose.model('users', userSchema)
