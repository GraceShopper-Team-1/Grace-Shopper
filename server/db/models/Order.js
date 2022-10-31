const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  userId: Sequelize.INTEGER,
  status: {
    type: Sequelize.ENUM("unfulfilled", "fulfilled"),
    defaultValue: "unfulfilled"
   },
});

module.exports = Order;
