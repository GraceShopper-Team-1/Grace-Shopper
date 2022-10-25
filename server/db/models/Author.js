const Sequelize = require('sequelize')
const db = require('../db')

const Author = db.define('author', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  bio: Sequelize.TEXT,
  imageUrl: Sequelize.STRING
})

module.exports = Author
