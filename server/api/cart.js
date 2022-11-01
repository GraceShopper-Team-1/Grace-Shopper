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
// create or edit cart
router.put("/edit/:userId", async (req, res, next) => {
	try {
		let currentOrder = await Order.findOrCreate({
			where: { userId: req.params.userId, status: "unfulfilled" },
			include: { model: Product, as: OrderProduct },
		});
		currentOrder = currentOrder[0];
		let orderProduct = await OrderProduct.findOne({
			where: { orderId: currentOrder.id, productId: req.body.productId },
		});
		if (!orderProduct) {
			orderProduct = await OrderProduct.create({
				where: {
					orderId: currentOrder.id,
					productId: req.body.productId,
					quantity: 1,
				},
			});
			console.log("new orderproduct", orderProduct);
			res.json(orderProduct);
		} else {
			let quantity = orderProduct.quantity + 1;
			await orderProduct.update({ quantity });
			console.log("updated orderproduct", orderProduct);
			res.json(orderProduct);
		}
		// res.json(orderProduct);
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
