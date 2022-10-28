import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCart, removeFromCart } from "./cartSlice";

function Cart() {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart);

	const handleRemoveFromCart = (id) => {
		dispatch(removeFromCart(id));
	};

	useEffect(() => {
		dispatch(fetchCart());
	}, [dispatch]);

	return (
		<div id="shopping-cart">
			<h3>Shopping Cart</h3>
			<div className="column-container">
				{cart.map((cartItem) => (
					<li key={cartItem.product.id} className="product-entry">
						<Link to={`/products/${cartItem.product.id}`}>
							<img
								src={cartItem.product.coverImageUrl}
								alt="Cover Image"
								className="product-img"
							/>
							<h3>{cartItem.product.title}</h3>
							<h5>{cartItem.product.author}</h5>
							<p>${cartItem.product.price}</p>
							<p>Quantity: {cartItem.purchaseQuantity}</p>
						</Link>
						<button
							type="button"
							onClick={() => handleRemoveFromCart(cartItem.product.id)}
						>
							Remove from cart
						</button>
					</li>
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
