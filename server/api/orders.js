const router = require("express").Router();
const {
	models: { Order, OrderProduct },
} = require("../db");
module.exports = router;

// o: Why do you have so much code for the backend before you have a frontend for
// 	said backend code. Please avoid piece mealing your features so you complete
// 	part of said feature now, and the second half later. That can lead to issues
// 	down the line.

// GET api/orders
router.get("/", async (req, res, next) => {
	try {
		const orders = await Order.findAll();
		res.json(orders);
	} catch (err) {
		next(err);
	}
});

// Adding new product to cart and order_products database
// POST api/orders/products
router.post("/products", async (req, res, next) => {
	try {
		const orderProduct = await OrderProduct.create(req.body);
		res.status(201).json(orderProduct);
	} catch (error) {
		next(error);
	}
});

// GET api/orders/:orderId
router.get("/:orderId", async (req, res, next) => {
	try {
		// o: please handle the scenario where the order is not found
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

// o: please avoid doing this: 1) if code doesn't work, remove it 2) if code does
// 	work and you are saving it for later... you are using git incorrectly

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
