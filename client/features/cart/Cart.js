import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../allProducts/allProductsSlice";

function Cart() {
	// placeholder code for reference -- we will replace most of this later
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	return (
		<div id="shopping-cart">
			<h3>Shopping Cart</h3>
			<div className="column-container">
				{cart.map((cartItem) => (
					<div className="cart-entry" key={cartItem.id}>
						<img
							src={cartItem.coverImage}
							alt="Cover Image"
							className="product-img"
						/>
						<h3>{cartItem.title}</h3>
						<h5>{cartItem.author}</h5>
						<p>${cartItem.price}</p>
						<p>Quantity: {cartItem.purchaseQuantity}</p>
					</div>
				))}
			</div>
			<div>
				<h3>Order details:</h3>
				<button type="submit">Checkout</button>
			</div>
		</div>
	);
}

export default Cart;
