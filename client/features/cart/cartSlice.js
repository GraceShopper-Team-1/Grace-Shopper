import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchAll", async () => {
	const token = localStorage.getItem("token");
	if (token !== null) {
		const { data } = await axios.get(`/api/cart/`, {
			headers: { authorization: token },
		});
		return data;
	} else {
		const books = JSON.parse(localStorage.getItem("guest"));
		localStorage.setItem("guest", JSON.stringify(books));
		return books;
	}
});

export const addToCart = createAsyncThunk("cart/add", async ({ productId }) => {
	const token = localStorage.getItem("token");
	if (token) {
		const { data } = await axios.put(
			`/api/cart/edit/`,
			{
				productId,
			},
			{ headers: { authorization: token } }
		);
		return data;
	}
});

export const removeFromCart = createAsyncThunk("removeFromCart", async (id) => {
	const token = localStorage.getItem("token");
	if (token) {
		const { data } = await axios.delete(`/api/cart/${id}`);
		return id;
	}
});

export const checkoutCart = createAsyncThunk("checkoutCart", async () => {
	const token = localStorage.getItem("token");
	if (token) {
		const { data } = await axios.put(
			`/api/cart/success/`,
			{},
			{ headers: { authorization: token } }
		);
		return data;
	} else {
		const books = localStorage.getItem("guest");
		const order = JSON.parse(books);
		return order;
	}
});

const initialState = {
	cart: [],
	paidCart: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.cart = action.payload;
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.cart.push(action.payload);
			})
			.addCase(removeFromCart.fulfilled, (state, action) => {
				state.cart = state.cart.filter((cart) => cart.id !== action.payload);
			})
			.addCase(checkoutCart.fulfilled, (state, action) => {
				state.paidCart = state.cart;
				state.cart = [];
			});
	},
});

export default cartSlice.reducer;
