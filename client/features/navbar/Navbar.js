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
						<Link to="/home">Home</Link>
						<Link to="/products">Browse All</Link>
						<Link to="/admin/products">Manage Products</Link>
						<Link to="/admin/users">Users</Link>
						<Link to="/admin/orders">Orders</Link>
						<Link to="/cart">
							<img
								className="cart-icon"
								src="https://static-00.iconduck.com/assets.00/shopping-cart-icon-512x462-yrde1eu0.png"
							/>
						</Link>
						<h4>Welcome, {username} (admin)</h4>
						<button type="button" onClick={logoutAndRedirectHome}>
							Logout
						</button>
					</div>
				) : isLoggedIn ? (
					<div className="navbar">
						<Link to="/home">Home</Link>
						<Link to="/products">Browse All</Link>
						<Link to="/cart">
							<img
								className="cart-icon"
								src="https://static-00.iconduck.com/assets.00/shopping-cart-icon-512x462-yrde1eu0.png"
							/>
						</Link>
						<h4>Welcome, {username}</h4>
						<button type="button" onClick={logoutAndRedirectHome}>
							Logout
						</button>
					</div>
				) : (
					<div className="navbar">
						<Link to="/home">Home</Link>
						<Link to="/products">Browse All</Link>
						<Link to="/cart">
							<img
								className="cart-icon"
								src="https://static-00.iconduck.com/assets.00/shopping-cart-icon-512x462-yrde1eu0.png"
							/>
						</Link>
						<div className="flex-container">
							<h4 className="flex-item">Welcome, guest</h4>
							<Link to="/login" className="flex-item">
								Login
							</Link>
							<Link to="/signup" className="flex-item">
								Sign Up
							</Link>
						</div>
					</div>
				)}
			</nav>
			<hr />
		</div>
	);
};

export default Navbar;
