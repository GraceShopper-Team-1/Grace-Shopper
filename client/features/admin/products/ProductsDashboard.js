import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingScreen from "../../loadingScreen/LoadingScreen";
import {
	fetchAllProducts,
	deleteProduct,
} from "../../allProducts/allProductsSlice";
// import AddProduct from "./AddProduct";

function ProductsDashboard() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.allProducts.products);
	const loading = useSelector((state) => state.allProducts.loading);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	const handleDeleteProduct = (productId) => {
		dispatch(deleteProduct(productId));
		// dispatch(fetchAllProducts());
	};

	return (
		<div id="products-dashboard">
			{loading ? (
				<LoadingScreen />
			) : (
				<div>
					<h2>Products Dashboard</h2>
					<Link to={"/admin/products/add"}>
						<button type="button">Add product</button>
					</Link>
					<br />
					<br />
					<table>
						<thead>
							<tr>
								<th></th>
								<th>Cover Image</th>
								<th>Title</th>
								<th>Author</th>
								<th>Price</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.id} className="admin-entry">
									<td>
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
										<p> </p>
										{/* <span>{product.id}</span> */}
									</td>
									<td>
										<img
											src={product.coverImageUrl}
											alt="Cover Image"
											className="admin-img"
										/>
									</td>
									<td>
										<Link to={`/products/${product.id}`}>
											<p>{product.title}</p>
										</Link>
									</td>
									<td>
										<p>{product.author}</p>
									</td>
									<td>
										<p>${product.price}</p>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export default ProductsDashboard;
