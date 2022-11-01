import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("cart/fetchAll", async () => {
  const token = localStorage.getItem("token");
  if (token !== null) {
    const { data } = await axios.get(`/api/cart/`, {
      headers: { authorization: token },
    });
    localStorage.setItem("books", JSON.stringify(data));
    return data;
  } else {
    const { data } = await axios.get(`/api/cart/`);
    localStorage.getItem("guest");
    return data;
  }
});

export const addToCart = createAsyncThunk(
	"cart/add",
	async ({ userId, productId }) => {
		const { data } = await axios.put(`/api/cart/edit/${userId}`, {
			productId,
			// quantity,
		});
		return data;
	}
);

export const removeFromCart = createAsyncThunk("removeFromCart", async (id) => {
  const { data } = await axios.delete(`/api/cart/${id}`);
  return id;
});

export const checkoutCart = createAsyncThunk("checkoutCart", async (userId) => {
	const { data } = await axios.put("/api/cart/success", { userId });
	return data;
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
				// const cartItem = state.cart.find(
				// 	(item) => item.productId === action.payload.productId
				// );
				// if (cartItem) {
				// 	cartItem.quantity++;
				// } else {
				// 	state.cart.push({ ...action.payload, quantity: 1 });
				// }
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
