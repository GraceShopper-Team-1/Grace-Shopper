const router = require("express").Router();
const sequelize = require("sequelize");
const {
	models: { Product, Order },
} = require("../db");
const checkForAdmin = require("./admin");
module.exports = router;

// GET api/products
router.get("/", async (req, res, next) => {
	try {
		const product = await Product.findAll({
			include: Order,
			order: [["author", "ASC"]],
		});
		res.json(product);
	} catch (err) {
		next(err);
	}
});

// GET api/products/:productsId
router.get("/:productId", async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.productId);
		res.json(product);
	} catch (err) {
		next(err);
	}
});

// POST api/products
router.post("/", checkForAdmin, async (req, res, next) => {
	try {
		const product = await Product.create(req.body);
		res.status(201).json(product);
	} catch (error) {
		next(error);
	}
});

// PUT /api/products/:productsId
router.put("/:productId", checkForAdmin, async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.productId);
		res.json(await product.update(req.body));
	} catch (error) {
		next(error);
	}
});

// DELETE /api/products/:productId
router.delete("/:productId", checkForAdmin, async (req, res, next) => {
	try {
		const product = await Product.findByPk(req.params.productId);
		await product.destroy();
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});
