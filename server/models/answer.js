'use strict'
module.exports = function (sequelize, DataTypes) {
  var Answers = sequelize.define('Answers', {
    content: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    questionid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Answers.hasMany(models.Vote_Answers, {foreignKey: 'answerid'})
        Answers.belongsTo(models.Questions, {foreignKey: 'questionid'})
        Answers.belongsTo(models.Users, {foreignKey: 'userid'})
      }
    }
  })
  return Answers
}
