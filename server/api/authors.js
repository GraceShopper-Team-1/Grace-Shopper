const router = require("express").Router();
const {
	models: { Author },
} = require("../db");
module.exports = router;

// GET api/authors
router.get("/", async (req, res, next) => {
	try {
		const authors = await Author.findAll();
		res.json(authors);
	} catch (err) {
		next(err);
	}
});

// GET api/authors/:authorId
router.get("/:authorId", async (req, res, next) => {
	try {
		const author = await Author.findByPk(req.params.authorId);
		res.json(author);
	} catch (err) {
		next(err);
	}
});

// POST api/authors
router.post("/", async (req, res, next) => {
	try {
		const author = await Author.create(req.body);
		res.status(201).json(author);
	} catch (error) {
		next(error);
	}
});

// PUT /api/authors/:authorId
router.put("/:authorId", async (req, res, next) => {
	try {
		const author = await Author.findByPk(req.params.authorId);
		res.json(await author.update(req.body));
	} catch (error) {
		next(error);
	}
});

// DELETE /api/authors/:authorId
router.delete("/:authorId", async (req, res, next) => {
	try {
		const author = await Author.findByPk(req.params.authorId)
		await author.destroy();
		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
});

