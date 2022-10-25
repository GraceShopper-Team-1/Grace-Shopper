const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

// GET api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET api/users/:userId
router.get("/:userId", async (req, res, next) => {
	try {
		const user = await User.findByPk(req.params.userId, {
			attributes: ["id", "username"],
		});
		res.json(user);
	} catch (err) {
		next(err);
	}
});

