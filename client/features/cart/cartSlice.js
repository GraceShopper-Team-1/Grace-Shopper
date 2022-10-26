import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchAll", async () => {
	const { data } = await axios.get("/api/cart");
	return data;
});

// split into POST and PUT for more than one click?
// updating order_products db, testing with orderId 1
export const addToCart = createAsyncThunk(
	"cart/add",
	async ({ id, title, author, coverImage, price }) => {
		const { data } = await axios.post("/api/cart", {
			title,
			author,
			coverImage,
			price,
			id,
			productId: id,
			orderId: 1,
		});
		console.log("data", data);
		return data;
	}
);

// export const updateCart = createAsyncThunk("cart/update", async (productId) => {
// 	const { data } = await axios.post("/api/cart", { productId, orderId: 1 }); // updating order_products db, testing with orderId 1
// 	console.log("data", data);
// 	return data;
// });

const initialState = {
	cart: [],
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
				const itemInCart = state.cart.find(
					(item) => item.id === action.payload.id
				);
				if (itemInCart) {
					itemInCart.purchaseQuantity++;
				} else {
					state.cart.push({ ...action.payload, purchaseQuantity: 1 });
				}
			});
		// .addCase(updateCart.fulfilled, (state, action) => {
		// 	const itemInCart = state.cart.find(
		// 		(item) => item.id === action.payload.id
		// 	);
		// 	itemInCart.purchaseQuantity++;
		// });
	},
});

export default cartSlice.reducer;
