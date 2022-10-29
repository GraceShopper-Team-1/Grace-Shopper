import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "./AllProductsSlice";
import { addToCart } from "../cart/cartSlice";

function AllProducts() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.allProducts.products);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
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
						<button type="button" onClick={() => handleAddToCart(product)}>
							Add to cart
						</button>
					</li>
				))}
			</div>
		</div>
	);
}

export default AllProducts;
