import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsByGenre = createAsyncThunk(
    "fetchProductsByGenre",
    async (genre) => {
      const { data } = await axios.get(`/api/products/${genre}`);
      return data;
    }
  );
  
  const initialState = []
  
  const rowSlice = createSlice({
    name: "row",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchProductsByGenre.fulfilled, (state, action) => {
       return (state = action.payload);
      });
    },
  });
  
  export default rowSlice.reducer;