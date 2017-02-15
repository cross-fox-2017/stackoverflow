const express = require('express')
const app = express()
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser');
var user = require('./routes/users.js');
var question = require('./routes/questions.js');
var mongoose = require('mongoose');
//mongoose connection to mongodb
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/stackoverflow');



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/users',user)
app.use('/questions',question)
app.listen(3000)

module.exports = app;
