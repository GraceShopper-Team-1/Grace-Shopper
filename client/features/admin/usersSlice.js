import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = window.localStorage.getItem("token");

const initialState = { allUsers: [], singleUser: {} };

export const getUsers = createAsyncThunk("getUsers", async () => {
  const { data } = await axios.get("/api/users", {
    headers: { authorization: token },
  });
  console.log(data);
  return data;
});

export const getSingleUser = createAsyncThunk("getSingleUser", async (id) => {
  const { data } = await axios.get(`/api/users/${id}`);
  return data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    });
    builder.addCase(getSingleUser.fulfilled, (state, action) => {
      state.singleUser = action.payload;
    });
  },
});

export default usersSlice.reducer;
