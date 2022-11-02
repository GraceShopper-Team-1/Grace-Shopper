import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = window.localStorage.getItem("token");

export const fetchOrders = createAsyncThunk("orders/fetchAll", async () => {
	const { data } = await axios.get("/api/orders", {
		headers: { authorization: token },
	});
	
	return data;
});

const initialState = {
	allOrders: [],
	loading: false
};

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	extraReducers: (builder) => {
		builder.addCase(fetchOrders.fulfilled, (state, action) => {
			state.allOrders =  action.payload;
			state.loading = false;
		});
		builder.addCase(fetchOrders.pending, (state, action) => {
			state.loading = true;
		});
	},
});

export default ordersSlice.reducer;
