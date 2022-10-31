import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = window.localStorage.getItem("token");

export const fetchSingleProduct = createAsyncThunk(
	"product/fetch",
	async (productId) => {
		const { data } = await axios.get(`/api/products/${productId}`);
		return data;
	}
);

export const editProduct = createAsyncThunk(
	"products/edit",
	async ({ productId, title, author, coverImageUrl, price }) => {
		const { data } = await axios.put(`/api/products/${productId}`, {
			title,
			author,
			coverImageUrl,
			price,
		}, { headers: { authorization: token }});
		return data;
	}
);

const initialState = {};

const singleProductSlice = createSlice({
	name: "singleProduct",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSingleProduct.fulfilled, (state, action) => {
				return (state = action.payload);
			})
			.addCase(editProduct.fulfilled, (state, action) => {
				return action.payload;
			});
	},
});

export default singleProductSlice.reducer;
