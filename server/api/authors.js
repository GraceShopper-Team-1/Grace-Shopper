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