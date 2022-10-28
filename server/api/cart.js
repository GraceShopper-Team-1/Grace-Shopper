const router = require("express").Router();
const {
	models: { OrderProduct, Product },
} = require("../db");
module.exports = router;

// GET api/cart -- get all items in cart, should be /:userId
router.get("/", async (req, res, next) => {
	try {
		const cart = await OrderProduct.findAll();

		const cartItemIds = cart.map((item) => item.productId);
		const books = await Product.findAll({
			where: {
				id: cartItemIds.map((bookId) => bookId),
			},
		});
		res.json(books);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

// POST api/cart -- add new item to cart, maybe should be put findOrCreate, or cart/:userId (no single GET)
router.post("/", async (req, res, next) => {
	try {
		const cartItem = await OrderProduct.create(req.body);
		res.status(201).json(cartItem);
	} catch (error) {
		next(error);
	}
});

// DELETE /api/cart/:cartId
router.delete("/:cartItemId", async (req, res, next) => {
	try {
		const cartItem = await OrderProduct.findByPk(req.params.cartItemId);
		await cartItem.destroy();
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});
