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

// return Product?
// updating order_products db, testing with orderId 1
export const addToCart = createAsyncThunk("cart/add", async ({ productId }) => {
  console.log("this is userId and productId in slice", productId);
  const token = localStorage.getItem("token");
  if (token) {
    const { data } = await axios.put(`/api/cart/`, {
      productId,
      headers: { authorization: token },
    });
    console.log("data", data);
    return data;
  } else {
    const { data } = await axios.put(`/api/cart/`, {
      productId,
    });
    localStorage.setItem("guest", JSON.stringify(data));
    return data;
  }
});

export const removeFromCart = createAsyncThunk("removeFromCart", async (id) => {
  const { data } = await axios.delete(`/api/cart/${id}`);
  return id;
});

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
        const cartItem = state.cart.find(
          (item) => item.productId === action.payload.productId
        );
        if (cartItem) {
          cartItem.purchaseQuantity++;
        } else {
          state.cart.push({ ...action.payload, purchaseQuantity: 1 });
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((cart) => cart.id !== action.payload);
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
