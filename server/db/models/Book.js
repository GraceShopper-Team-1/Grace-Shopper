const sequelize = require("sequelize");
const Sequelize = require("sequelize");
const db = require("../db");

const Book = db.define("book", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
  },
  genre: {
    type: Sequelize.STRING,
  },
  coverImage: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
  },
  publishedDate: {
    type: Sequelize.DATE,
  },
  pages: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.TEXT,
  },
  language: {
    type: Sequelize.STRING,
  },
  coverType: {
    type: Sequelize.STRING,
  },
  isbn: {
    type: Sequelize.STRING,
  },
});

module.exports = Book;
