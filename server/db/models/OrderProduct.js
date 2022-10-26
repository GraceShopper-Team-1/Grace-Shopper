const db = require("../db");
const Sequelize = require("sequelize");

// o: is this code being used anywhere yet?
const OrderProduct = db.define("order_product", {
	purchaseQuantity: {
		type: Sequelize.INTEGER,
	},
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
	// o: please do not leave code in that will be used in the future, add code to main
  // when its fully ready
	// language: {
	//   type: Sequelize.STRING,
	// },
	coverType: {
		type: Sequelize.STRING,
	},
	isbn: {
		type: Sequelize.STRING,
	},
});

module.exports = OrderProduct;
