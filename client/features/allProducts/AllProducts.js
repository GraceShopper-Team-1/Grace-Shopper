import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { fetchAllProducts } from "./allProductsSlice";
import { addToCart } from "../cart/cartSlice";
import LoadingScreen from "../loadingScreen/LoadingScreen";
import Toast from "../toast/Toast";

function AllProducts() {
	const dispatch = useDispatch();
	const products = useSelector((state) => state.allProducts.products);
	const loading = useSelector((state) => state.allProducts.loading);
	const isLoggedIn = useSelector((state) => !!state.auth.me.id);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	const makeToast = () => {
		const toast = document.getElementById("toast");
		toast.className = "show";
		setTimeout(function () {
			toast.className = toast.className.replace("show", "");
		}, 500);
	};

	const handleAddToCart = (productId) => {
		makeToast();
		dispatch(addToCart({ productId }));
	};

	let productArr = [];
	const handleGuestCart = (product) => {
		makeToast();
		productArr.push(product);
		localStorage.setItem("guest", JSON.stringify(productArr));
	};

	return (
		<div id="all-products">
			{loading ? (
				<LoadingScreen />
			) : (
				<div>
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
									onClick={() => {
										isLoggedIn
											? handleAddToCart(product.id)
											: handleGuestCart(product);
									}}
								>
									Add to cart
								</button>
								<Toast />
							</li>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default AllProducts;
