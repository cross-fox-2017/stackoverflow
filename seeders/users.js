const passwordHash = require('password-hash')

const data = [
  {
    username: 'dgana',
    password: passwordHash.generate('123'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'admin',
    password: passwordHash.generate('123'),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'john',
    password: passwordHash.generate('123'),
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

module.exports = data
