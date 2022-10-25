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

const singleProductSlice = createSlice({
  name: "singleCampus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

export default singleProductSlice.reducer;
