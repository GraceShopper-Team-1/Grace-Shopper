const {
	models: { User },
} = require("../db");

const checkForAdmin = async (req, res, next) => {
	// const currentUser = await User.findByToken(req.headers.authorization);
	// console.log("currentUser", currentUser);
	const currentUser = req.user;
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
