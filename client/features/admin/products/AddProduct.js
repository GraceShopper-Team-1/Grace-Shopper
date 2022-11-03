import { use } from "chai";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addProduct } from "../../allProducts/allProductsSlice";
import LoadingScreen from "../../loadingScreen/LoadingScreen";

const AddProduct = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [coverImageUrl, setCoverImageUrl] = useState("");
	const [price, setPrice] = useState(0);

	const loading = useSelector((state) => state.allProducts.loading);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(addProduct({ title, author, coverImageUrl, price }));
		setTitle("");
		setAuthor("");
		setCoverImageUrl("");
		setPrice(0);
		navigate("/admin/products");
	};

	return (
		<div className="sticky">
			{loading ? (
				<LoadingScreen />
			) : (
				<div className="root">
					<h3 className="gray">Add new entry</h3>
					<form onSubmit={handleSubmit}>
						<label htmlFor="title">Title:</label>
						<input
							type="text"
							placeholder="Title"
							name="title"
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>
						<label htmlFor="author">Author:</label>
						<input
							type="text"
							placeholder="Author"
							name="author"
							value={author}
							onChange={(event) => setAuthor(event.target.value)}
						/>
						<label htmlFor="coverImageUrl">Cover image URL:</label>
						<input
							type="text"
							placeholder="Cover image URL"
							name="coverImageUrl"
							value={coverImageUrl}
							onChange={(event) => setCoverImageUrl(event.target.value)}
						/>
						<label htmlFor="price">Price:</label>
						<input
							type="text"
							placeholder="Price"
							name="price"
							value={price}
							onChange={(event) => setPrice(event.target.value)}
						/>
						<br />
						<br />

						<button type="submit">Submit</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default AddProduct;
