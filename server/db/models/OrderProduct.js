const db = require("../db");
const Sequelize = require("sequelize");

const OrderProduct = db.define("order_product", {
  purchaseQuantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = OrderProduct;
