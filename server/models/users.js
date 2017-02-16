var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UsersSchema = new Schema({
  username: String,
  password: String
})

var users = mongoose.model('Users', UsersSchema);

module.exports = users
