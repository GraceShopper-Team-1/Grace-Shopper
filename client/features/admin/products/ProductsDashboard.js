import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	fetchAllProducts,
	deleteProduct,
} from "../../allProducts/allProductsSlice";
import AddProduct from "./AddProduct";

function ProductsDashboard() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.allProducts.products);
	const userId = useSelector((state) => state.auth.me.id);
	

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	const handleDeleteProduct = (productId) => {
		dispatch(deleteProduct(productId));
	};

	return (
		<div id="products-dashboard">
			<Link to={"/admin/products/add"}>
				<br />
				<button type="button">Add product</button>
			</Link>
			<br />
			<br />
			<hr />
			<br />
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
					<Link to={`/admin/products/${product.id}`}>
						<button className="admin-btn" type="button">
							Edit
						</button>
					</Link>
					<button
						className="admin-btn"
						type="button"
						onClick={() => handleDeleteProduct(product.id)}
					>
						Delete
					</button>
					<hr />
				</li>
			))}
		</div>
	);
}

export default ProductsDashboard;
