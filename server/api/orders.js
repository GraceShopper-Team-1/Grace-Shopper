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

// GET api/orders/:orderId
router.get("/:orderId", async (req, res, next) => {
	try {
		const order = await Order.findByPk(req.params.orderId);
		res.json(order);
	} catch (err) {
		next(err);
	}
});

// POST api/orders
router.post("/", async (req, res, next) => {
	try {
		const order = await Order.create(req.body);
		res.status(201).json(order);
	} catch (error) {
		next(error);
	}
});

// PUT /api/orders/:orderId
router.put("/:orderId", async (req, res, next) => {
	try {
		const order = await Order.findByPk(req.params.orderId, {
			include: [OrderProduct],
		});
		// res.json(await order.update({order.status: 'fulfilled'});
	} catch (error) {
		next(error);
	}
});
