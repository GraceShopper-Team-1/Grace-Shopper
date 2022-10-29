import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchCart, removeFromCart } from "./cartSlice";

function Cart() {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart);
	const userId = useSelector((state) => state.auth.me.id);

	const handleRemoveFromCart = (id) => {
		dispatch(removeFromCart(id));
	};

	useEffect(() => {
		dispatch(fetchCart(userId));
	}, [dispatch]);

	return (
		<div id="shopping-cart">
			<h3>Shopping Cart</h3>
			<div className="column-container">
				{cart.map((cartItem) => (
					<li key={cartItem.id} className="product-entry">
						<Link to={`/products/${cartItem.id}`}>
							<img
								src={cartItem.coverImageUrl}
								alt="Cover Image"
								className="product-img"
							/>
							<h3>{cartItem.title}</h3>
							<h5>{cartItem.author}</h5>
							<p>${cartItem.price}</p>
							<p>Quantity: {cartItem.orders.order_product.purchaseQuantity}</p>
						</Link>
						<button
							type="button"
							onClick={() => handleRemoveFromCart(cartItem.id)}
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
