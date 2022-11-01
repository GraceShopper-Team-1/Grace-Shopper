import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchCart, removeFromCart, checkoutCart } from "./cartSlice";
import OrderSuccess from "../orderSuccess/OrderSuccess";
import { Route, Routes } from "react-router-dom";

function Cart() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart);

	// o: is there an instance where this comes back undefined?... I am wondering
	// 	when would it set userId to null here 
	const userId = useSelector((state) => state.auth.me.id) || null;

	const handleRemoveFromCart = (id) => {
		dispatch(removeFromCart(id));
	};

	const handleCheckout = (userId) => {
		dispatch(checkoutCart(userId))

		// o: please remove if this component is functional and working as intended
		console.log("cart submit button clicked");
		navigate("/cart/success");
	};

	useEffect(() => {
		dispatch(fetchCart(userId));
	}, [dispatch]);

	return (
		<div id="shopping-cart">
			<h3>Shopping Cart</h3>
			<div className="column-container">
				{cart.length ? (
					cart.map((cartItem) => (
						<li key={cartItem.id} className="product-entry">
							<Link to={`/products/${cartItem.id}`}>
								<img
									src={cartItem.coverImageUrl}
									alt="Cover Image"
									className="product-img"
								/>
								<h3>Order details:</h3>
								<h3>{cartItem.title}</h3>
								<h5>By: {cartItem.author}</h5>
								<p>${cartItem.price}</p>
								<p>Quantity: {cartItem.quantity}</p>
							</Link>
							<button
								type="button"
								onClick={() => handleRemoveFromCart(cartItem.id)}
							>
								Remove from cart
							</button>
						</li>
					))
				) : (
					<h3>Your cart is empty!</h3>
				)}
			</div>
			<div>
				<button type="submit" onClick={() => handleCheckout(userId)}>
					Checkout
				</button>
			</div>
		</div>
	);
}

export default Cart;
