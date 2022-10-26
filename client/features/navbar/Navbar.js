import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
	const isLoggedIn = useSelector((state) => !!state.auth.me.id);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logoutAndRedirectHome = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<div>
			<h1>Book Worm</h1>
			<nav>
				{isLoggedIn ? (
					<div className="navbar">
						{/* The navbar will show these links after you log in */}
						<Link to="/home">Home</Link>
						<Link to="/products">Browse</Link>
						<Link to="/cart">
							<img
								className="cart-icon"
								src="https://static-00.iconduck.com/assets.00/shopping-cart-icon-512x462-yrde1eu0.png"
							/>
						</Link>
						<button type="button" onClick={logoutAndRedirectHome}>
							Logout
						</button>
					</div>
				) : (
					<div>
						{/* The navbar will show these links before you log in */}
						<Link to="/login">Login</Link>
						<Link to="/signup">Sign Up</Link>
					</div>
				)}
			</nav>
			<hr />
		</div>
	);
};

export default Navbar;
