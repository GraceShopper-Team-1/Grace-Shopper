import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//just have this for test purposes
export const fetchAllProducts = createAsyncThunk(
	"products/fetchAll",
	async () => {
		const { data } = await axios.get("/api/products");
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
		builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
			state.products = action.payload;
		});
	},
});

export default allProductsSlice.reducer;
