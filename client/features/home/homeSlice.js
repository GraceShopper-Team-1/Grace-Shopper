import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFeaturedProducts = createAsyncThunk(
  "home/fetchFeaturedProducts",
  async () => {
    const { data } = await axios.get(
        
      "https://api.nytimes.com/svc/books/v3/lists/young-adult-paperback-monthly.json?api-key=LAb33WvyGlQbTJuFxzvopNpRoK8dgaKH"
    );
    console.log(data, '<- data');
    return data.results.books;
  }
);

const initialState = {
  featuredProducts: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
      state.featuredProducts = action.payload;
    });
  },
});

export default homeSlice.reducer;
