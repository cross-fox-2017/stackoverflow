'use strict'
module.exports = function (sequelize, DataTypes) {
  var Questions = sequelize.define('Questions', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        Questions.hasMany(models.Answers, {foreignKey: 'questionid'})
        Questions.hasMany(models.Vote_Questions, {foreignKey: 'questionid'})
        Questions.hasMany(models.Vote_Answers, {foreignKey: 'questionid'})
        Questions.belongsTo(models.Users, {foreignKey: 'userid'})
      }
    }
  })
  return Questions
}
