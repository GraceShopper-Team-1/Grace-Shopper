import React from "react";
import { fetchCart } from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function OrderSuccess() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.paidCart);
	const userId = useSelector((state) => state.auth.me.id);
	const isLoggedIn = useSelector((state) => !!state.auth.me.id);

	useEffect(() => {
		dispatch(fetchCart(userId));
	}, [dispatch]);

	return (
		<div>
			<h1> THANK YOU FOR YOUR ORDER!</h1>
			{isLoggedIn ? (
				<div>
					<h2>
						Order total: $
						{cart
							.reduce(
								(acc, curr) => acc + curr?.order_product?.quantity * curr.price,
								0
							)
							.toFixed(2)}
					</h2>
					<h3>Items In Your Order:</h3>
					<hr />
					{cart.map((item) => (
						<div className="cart-div">
							<li key={item.id}>
								<div className="content">
									<img
										className="cart-img"
										src={item.coverImageUrl}
										alt="Book Image"
									/>
									<h5 className="cart-title">
										{item.title} (x{item?.order_product.quantity})
									</h5>
									<h5 className="cart-author">{item.author}</h5>
									<h5 className="cart-quantity">${item.price}</h5>
									<br />
									<h5 className="cart-price">
										Total price: $
										{`${(item.price * item?.order_product?.quantity).toFixed(
											2
										)}`}
									</h5>
								</div>
								<br />
								<hr />
							</li>
						</div>
					))}
				</div>
			) : (
				<h3>Your order has been processed.</h3>
			)}
			<button className="success-btn" onClick={() => navigate("/products")}>
				{" "}
				Continue shopping{" "}
			</button>
		</div>
	);
}

export default OrderSuccess;
