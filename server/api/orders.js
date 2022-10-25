const router = require("express").Router();
const {
	models: { Order, orderProducts},
} = require("../db");
module.exports = router;

// GET api/orders
router.get("/", async (req, res, next) => {
	try {
		const orders = await Order.findAll();
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

// ****** Order Products ******
// orders--> orderProducts ==> 

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

// // DELETE /api/authors/:authorId
// router.delete("/:authorId", async (req, res, next) => {
// 	try {
// 		const author = await Order.findByPk(req.params.authorId)
// 		await author.destroy();
// 		res.sendStatus(204);
// 	} catch (error) {
// 		next(error);
// 	}
// });

