import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../singleProduct/singleProductSlice";
import SingleProduct from "../singleProduct/SingleProduct";

const EditProduct = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [coverImageUrl, setCoverImageUrl] = useState("");
	const [price, setPrice] = useState(0);

	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault();
		dispatch(editProduct({ title, author, coverImageUrl, price }));
		setTitle("");
		setAuthor("");
		setCoverImageUrl("");
		setPrice(0);
	};

	return (
		<div className="sticky">
			<SingleProduct />
			<h3 className="gray">Edit entry</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="title">Title:</label>
				<input
					type="text"
					name="title"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<label htmlFor="author">Author:</label>
				<input
					type="text"
					name="author"
					value={author}
					onChange={(event) => setAuthor(event.target.value)}
				/>
				<label htmlFor="coverImageUrl">Cover Image URL:</label>
				<input
					type="text"
					name="coverImageUrl"
					value={coverImageUrl}
					onChange={(event) => setCoverImageUrl(event.target.value)}
				/>
				<label htmlFor="price">Price:</label>
				<input
					type="text"
					name="price"
					value={price}
					onChange={(event) => setPrice(event.target.value)}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default EditProduct;
