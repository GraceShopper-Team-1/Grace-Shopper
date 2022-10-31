import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "./allProductsSlice";
import { addToCart } from "../cart/cartSlice";

function AllProducts() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.allProducts.products);
	const userId = useSelector((state) => state.auth.me.id);
	// const userId = req.user.id;
	console.log("userId", userId);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	const handleAddToCart = (userId, productId) => {
		console.log("this is inside the event handler", userId, productId);
		dispatch(addToCart({ userId, productId }));
	};

	return (
		<div id="all-products">
			<h3>Bestsellers</h3>
			<div className="column-container">
				{products.map((product) => (
					<li key={product.id} className="product-entry">
						<Link to={`/products/${product.id}`}>
							<img
								src={product.coverImageUrl}
								alt="Cover Image"
								className="product-img"
							/>
							<h3>{product.title}</h3>
							<h5>{product.author}</h5>
							<p>${product.price}</p>
						</Link>
						<button
							type="button"
							onClick={() => handleAddToCart(userId, product.id)}
						>
							Add to cart
						</button>
					</li>
				))}
			</div>
		</div>
	);
}

export default AllProducts;
