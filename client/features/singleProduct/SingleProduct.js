import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "./singleProductSlice";
import { useParams } from "react-router-dom";

function SingleProduct() {
	const dispatch = useDispatch();

	// o: you don't need the extra spacing here
	const { productId } = useParams();

	// o: I would destructure this for clarity
	const product = useSelector((state) => state.singleProduct);

	// o: please remove console.logs that are just for testing
	console.log(product);

	useEffect(() => {
		dispatch(fetchSingleProduct(productId));
	}, []);

	return (
		<div>
			<header>
				<img src={product.coverImage} className="single-img" />
			</header>
			<div>
				<body>
					<h2>{product.title}</h2> by {product.author}
				</body>
			</div>
			<div>
				<body>
					<p>{product.description}</p>
				</body>
				<h2>${product.price}</h2>
				<p>{product.isbn}</p>
			</div>
			<div>
				<button type="submit">Add to cart</button>
			</div>
		</div>
	);
}

export default SingleProduct;
