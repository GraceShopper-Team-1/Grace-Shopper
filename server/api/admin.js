const checkForAdmin = (req, res, next) => {
	const currentUser = req.user;
	if (currentUser && currentUser.isAdmin) {
		next();
	} else {
		const error = new Error(
			"<h3>Access denied.<h3>"
		);
		error.status = 401;
		next(error);
	}
};

module.exports = checkForAdmin;
