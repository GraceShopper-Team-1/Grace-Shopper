import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
	"products/fetchAll",
	async () => {
		const { data } = await axios.get("/api/products");
		return data;
	}
);

export const addProduct = createAsyncThunk(
	"products/add",
	async (productId) => {
		const { data } = await axios.post(`/api/products/${productId}`);
		return data;
	}
);

export const deleteProduct = createAsyncThunk(
	"products/delete",
	async (productId) => {
		const { data } = await axios.delete(`/api/products/${productId}`);
		return data;
	}
);

const initialState = {
	products: [],
};

const allProductsSlice = createSlice({
	name: "allProducts",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				state.products = action.payload;
			})
			.addCase(addProduct.fulfilled, (state, action) => {
				state.products.push(action.payload);
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.products = state.products.filter(
					(product) => product.id !== action.payload
				);
			});
	},
});

export default allProductsSlice.reducer;
