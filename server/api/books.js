const router = require("express").Router();
const {
	models: { Book, Author },
} = require("../db");
module.exports = router;

// GET api/books
router.get("/", async (req, res, next) => {
	try {
		const books = await Book.findAll({ include: Author });
		res.json(books);
	} catch (err) {
		next(err);
	}
});

// GET api/books/:bookId