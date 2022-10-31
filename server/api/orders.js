const router = require("express").Router();
const {
	models: { Order, OrderProduct },
} = require("../db");
const checkForAdmin = require("./admin");
module.exports = router;

// GET api/orders
router.get("/", checkForAdmin, async (req, res, next) => {
	try {
		const orders = await Order.findAll();
		res.json(orders);
	} catch (err) {
		next(err);
	}
});

// // POST api/orders/products
// router.post("/products", async (req, res, next) => {
// 	try {
// 		const orderProduct = await OrderProduct.create(req.body);
// 		res.status(201).json(orderProduct);
// 	} catch (error) {
// 		next(error);
// 	}
// });

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

// ****** Order Products ******

// PUT /api/orders/:orderId
// router.put("/:orderId", async (req, res, next) => {
// 	try {
// 		const order = await Order.findByPk(req.params.orderId, {
// 			include: [orderProducts]
// 		});
// 		res.json(await order.update({orderProducts}));
// 	} catch (error) {
// 		next(error);
// 	}
// });

