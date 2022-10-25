//this is the access point for all things database related!

const db = require('./db')
const User = require('./models/User')
const Book = require('./models/Book')
const Author = require('./models/Author')

// other potential models: Cart, Genre

Book.belongsTo(Author);
Author.hasMany(Book);

// is this really many-to-many?
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
