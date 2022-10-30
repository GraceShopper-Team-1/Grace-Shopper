import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../allProducts/allProductsSlice";
import { addToCart } from "../cart/cartSlice";

function ProductsDashboard() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.allProducts.products);
	const userId = useSelector((state) => state.auth.me.id);
	// const userId = req.user.id;
	console.log("userId", userId);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	const handleDeleteProduct = (productId) => {
		dispatch(deleteProduct(productId));
	};

	return (
		<div id="products-dashboard">
			{products.map((product) => (
				<li key={product.id} className="admin-entry">
					<Link to={`/products/${product.id}`}>
						<img
							src={product.coverImageUrl}
							alt="Cover Image"
							className="admin-img"
						/>
						<p>{product.title}</p>
						<p>{product.author}</p>
						<p>${product.price}</p>
					</Link>
					<button type="button" onClick={() => handleDeleteProduct(product.id)}>
						Delete
					</button>
				</li>
			))}
		</div>
	);
}

export default ProductsDashboard;
