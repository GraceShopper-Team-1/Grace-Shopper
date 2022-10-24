//this is the access point for all things database related!

const db = require('./db')
const User = require('./models/User')
const Book = require('./models/Book')
const Author = require('./models/Author')

//associations could go here
// or here

Book.belongsToMany(User, {through: 'User_Books'})
User.belongsToMany(Book, {through: 'User_Books'})

module.exports = {
  db,
  models: {
    User,
    Book,
    Author
  },
}
