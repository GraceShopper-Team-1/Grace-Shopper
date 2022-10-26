const router = require("express").Router();
const {
	models: { OrderProduct },
} = require("../db");
module.exports = router;

// GET api/cart
router.get("/", async (req, res, next) => {
	try {
		const cart = await OrderProduct.findAll();
		res.json(cart);
	} catch (err) {
		next(err);
	}
});

// POST api/cart
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