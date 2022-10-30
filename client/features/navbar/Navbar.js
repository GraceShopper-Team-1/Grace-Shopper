import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
	const isLoggedIn = useSelector((state) => !!state.auth.me.id);
	const isAdmin = useSelector((state) => !!state.auth.me.isAdmin);
	const username = useSelector((state) => state.auth.me.username);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const logoutAndRedirectHome = () => {
		dispatch(logout());
		navigate("/login");
	};

	return (
		<div>
			<Link to="/home">
				<h1>Bookworm</h1>
			</Link>
			<nav>
				{isLoggedIn && isAdmin ? (
					<div className="navbar">
						{/* The navbar will show these links after you log in */}
						<Link to="/home">Home</Link>
						<Link to="/products">Browse</Link>
						<Link to="/products-dashboard">Products Dashboard</Link>
						<Link to="/cart">
							<img
								className="cart-icon"
								src="https://static-00.iconduck.com/assets.00/shopping-cart-icon-512x462-yrde1eu0.png"
							/>
						</Link>
						<h4>Welcome Admin {username}</h4>
						<button type="button" onClick={logoutAndRedirectHome}>
							Logout
						</button>
					</div>
				) : isLoggedIn ? (
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
						<h4>Welcome {username}</h4>
						<button type="button" onClick={logoutAndRedirectHome}>
							Logout
						</button>
					</div>
				) : (
					<div className="navbar">
						<Link to="/home">Home</Link>
						<Link to="/products">Browse</Link>
						<Link to="/cart">
							<img
								className="cart-icon"
								src="https://static-00.iconduck.com/assets.00/shopping-cart-icon-512x462-yrde1eu0.png"
							/>
						</Link>
						<h4>Welcome to Bookworm</h4>
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
