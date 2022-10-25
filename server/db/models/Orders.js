const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  userId: Sequelize.INTEGER,
  status: Sequelize.ENUM({
    values: ["Fulfilled", "Unfulfilled"],
  }),
});

module.exports = Order;
