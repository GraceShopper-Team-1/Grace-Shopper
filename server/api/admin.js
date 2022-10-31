const jwt = require("jsonwebtoken");
const {
	models: { User },
} = require("../db");

const checkForAdmin = async (req, res, next) => {
	// const token = window.localStorage.getItem("token");
	// const currentUser = await User.findByToken(token);
	const currentUser = await User.findByToken(req.headers.authorization);
	console.log("currentUser", currentUser);
	// const currentUser = User.findByPk(req.body.id)
	// const currentUser = req.user;
	if (currentUser && currentUser.isAdmin) {
		console.log("checkForAdmin success!");
		next();
	} else {
		const error = new Error("<h3>Access denied.<h3>");
		error.status = 401;
		next(error);
	}
};

module.exports = checkForAdmin;
