'use strict'
module.exports = function (sequelize, DataTypes) {
  var Vote_Questions = sequelize.define('Vote_Questions', {
    questionid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Vote_Questions.belongsTo(models.Users, {foreignKey: 'userid'})
        Vote_Questions.belongsTo(models.Questions, {foreignKey: 'questionid'})
      }
    }
  })
  return Vote_Questions
}
