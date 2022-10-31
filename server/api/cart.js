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







// old GET
// router.get("/", async (req, res, next) => {
// 	try {
// 		const cart= await OrderProduct.findAll();
// 		const cartItemIds = cart.map((item) => item.productId);
// 		const books = await Product.findAll({
// 			where: {
// 				id: cartItemIds.map((bookId) => bookId),
// 			},
// 		});
// 		res.json(books);
// 	} catch (error) {
// 		console.log(error);
// 		next(error);
// 	}
// });

// POST api/cart -- add new item to cart, maybe should be put findOrCreate, or cart/:userId (no single GET)
// router.post("/", async (req, res, next) => {
// 	try {
// 		const cartItem = await OrderProduct.create(req.body);
// 		res.status(201).json(cartItem);
// 	} catch (error) {
// 		next(error);
// 	}
// });







// isAdminOrUser
router.put("/:userId", async (req, res, next) => {
	try {
		const currentOrder = await Order.findOne({
			where: { userId: req.params.userId, status: "unfulfilled" },
			include: { model: Product, as: OrderProduct },
		});
		// { productId } = req.body; // purchaseQuantity?
		const orderProduct = await OrderProduct.findOrCreate({
			where: { orderId: currentOrder.id, productId: req.body.productId },
			// include: { model: Product }, // need to do new association for this
		});
		// await currentOrder.update(quantity);
		// await orderProduct.save();
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
