import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = window.localStorage.getItem("token");

export const fetchOrders = createAsyncThunk("orders/fetchAll", async () => {
	const { data } = await axios.get("/api/orders", {
		headers: { authorization: token },
	});
	console.log(data);
	return data;
});

const initialState = [];

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchOrders.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export default ordersSlice.reducer;
