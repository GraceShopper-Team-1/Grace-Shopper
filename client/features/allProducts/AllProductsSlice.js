import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const { data } = await axios.get("/api/products");
    return data;
  }
);


const allProductsSlice = createSlice({
  name: "allProducts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      console.log(state, '<-state')
      state.push(action.payload);
    });
  },
});

// export const selectProducts = (state) => {
//   return state.authors;
// };

export default allProductsSlice.reducer;
