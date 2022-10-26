
const Sequelize = require("sequelize");
const db = require("../db");

// o: maybe yall can name this Book if you are just selling books only
const Product = db.define("product", {
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
  // o: I am assuming this is a url, you should rename it to coverImageUrl since
  //  you are not storing the actual image in the db
  coverImage: {
    type: Sequelize.STRING,
  },
  // o: I guess you are going the pennies route? 🤔
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
  // o: please do not leave code in that will be used in the future, add code to main
  // when its fully ready
  // language: {
  //   type: Sequelize.STRING,
  // },
  // o: if you are planning on working on filtering (categories), you likely want
  //  to create a table of coverTypes
  coverType: {
    type: Sequelize.STRING,
  },
  isbn: {
    type: Sequelize.STRING,
  },
});

module.exports = Product;
