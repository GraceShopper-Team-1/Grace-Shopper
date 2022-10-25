const db = require("../db");
const Sequelize = require("sequelize");

const orderProducts = db.define("order_products", {
  purchaseQuantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = orderProducts;
