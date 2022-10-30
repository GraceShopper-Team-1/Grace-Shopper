import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleCampus",
  async (productId) => {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data;
  }
);

export const editProduct = createAsyncThunk(
	"fetchSingleCampus",
	async (productId) => {
		const { data } = await axios.put(`/api/products/${productId}`);
		return data;
	}
);

const singleProductSlice = createSlice({
  name: "singleCampus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      return (state = action.payload);
    }).addCase(editProduct.fulfilled, (state, action) => {
      return action.payload;
    })
  },
});

export default singleProductSlice.reducer;
