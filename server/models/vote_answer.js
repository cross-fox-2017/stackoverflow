'use strict'
module.exports = function (sequelize, DataTypes) {
  var Vote_Answers = sequelize.define('Vote_Answers', {
    answerid: DataTypes.INTEGER,
    questionid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Vote_Answers.belongsTo(models.Users, {foreignKey: 'userid'})
        Vote_Answers.belongsTo(models.Answers, {foreignKey: 'answerid'})
        Vote_Answers.belongsTo(models.Questions, {foreignKey: 'questionid'})
      }
    }
  })
  return Vote_Answers
}
