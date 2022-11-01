const router = require("express").Router();
const {
	models: { Order, OrderProduct, Product },
} = require("../db");
module.exports = router;

// GET api/cart -- get all items in cart, should be /:userId, status: "unfulfilled"
router.get("/:userId", async (req, res, next) => {
	try {
		let cart = await Order.findOrCreate({
			where: { userId: req.params.userId, status: "unfulfilled" },
			include: Product,
		});
		cart = cart[0].products;
		res.json(cart);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

// isAdminOrUser
router.put("/edit/:userId", async (req, res, next) => {
	try {
		let currentOrder = await Order.findOrCreate({
			where: { userId: req.params.userId, status: "unfulfilled" },
			include: { model: Product, as: OrderProduct },
		});
		currentOrder = currentOrder[0];
		const orderProduct = await OrderProduct.findOrCreate({
			where: { orderId: currentOrder.id, productId: req.body.productId },
		});
		res.json(orderProduct[0]);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

// DELETE /api/cart/:cartId -- remove item from cart
router.delete("/:cartItemId", async (req, res, next) => {
	try {
		const cartItem = await OrderProduct.findByPk(req.params.cartItemId);
		await cartItem.destroy();
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

// checkout cart
router.put("/success", async (req, res, next) => {
	try {
		const currentOrder = await Order.findOne({
			where: {
				userId: req.body.userId || null, // guest checkout is null?
				status: "unfulfilled",
			},
			include: { model: Product, as: OrderProduct },
		});
		const updatedOrder = await currentOrder.update({
			status: "fulfilled",
		});
		res.json(updatedOrder);
	} catch (error) {
		console.log(error);
		next(error);
	}
});
