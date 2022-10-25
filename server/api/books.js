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
router.get("/:bookId", async (req, res, next) => {
	try {
		const book = await Book.findByPk(req.params.bookId);
		res.json(book);
	} catch (err) {
		next(err);
	}
});

// POST api/books
router.post("/", async (req, res, next) => {
	try {
		const book = await Book.create(req.body);
		res.status(201).json(book);
	} catch (error) {
		next(error);
	}
});

// PUT /api/books/:bookId
router.put("/:bookId", async (req, res, next) => {
	try {
		const book = await Book.findByPk(req.params.bookId);
		res.json(await book.update(req.body));
	} catch (error) {
		next(error);
	}
});

// DELETE /api/books/:bookId
router.delete("/:bookId", async (req, res, next) => {
	try {
		const book = await Book.findByPk(req.params.bookId)
		await book.destroy();
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

