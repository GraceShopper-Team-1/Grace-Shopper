import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = window.localStorage.getItem("token");

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const { data } = await axios.get("/api/products");
    return data;
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async ({ title, author, coverImageUrl, price }) => {
    const { data } = await axios.post(
      "/api/products",
      { title, author, coverImageUrl, price },
      { headers: { authorization: token } }
    );
    return data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (productId) => {
    const { data } = await axios.delete(`/api/products/${productId}`, {
      headers: { authorization: token },
    });
    return data;
  }
);

const initialState = {
  products: [],
  loading: false,
};

const allProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default allProductsSlice.reducer;
