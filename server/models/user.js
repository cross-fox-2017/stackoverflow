'use strict'
module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      validate: {
        isUniqued: function (value, next) {
          Users.findAll({
            where: {
              username: value
            }
          }).then(function (data) {
            if (data.length > 0) {
              return next('Username already exist')
            }
            return next()
          })
        }
      }
    },
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Users.hasMany(models.Questions, {foreignKey: 'userid'})
        Users.hasMany(models.Answers, {foreignKey: 'userid'})
        Users.hasMany(models.Vote_Questions, {foreignKey: 'userid'})
        Users.hasMany(models.Vote_Answers, {foreignKey: 'userid'})
      }
    }
  })
  return Users
}
