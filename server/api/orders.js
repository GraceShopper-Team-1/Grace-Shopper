const router = require("express").Router();
const {
	models: { Order, OrderProduct, User, Product },
} = require("../db");
const checkForAdmin = require("./admin");
module.exports = router;

// GET api/orders
router.get("/", checkForAdmin, async (req, res, next) => {
	try {
		const orders = await Order.findAll({
			include: [User, Product],
		});
		res.json(orders);
	} catch (err) {
		next(err);
	}
});
