const router = require("express").Router();
const {
	models: { Book, Author },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
	try {
		const books = await Book.findAll({ include: Author });
		res.json(books);
	} catch (err) {
		next(err);
	}
});
