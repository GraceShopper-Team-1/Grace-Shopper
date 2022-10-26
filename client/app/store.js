import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import allProductsReducer from "../features/allProducts/allProductsSlice";
import singleProductReducer from "../features/singleProduct/singleProductSlice";
import cartReducer from "../features/cart/cartSlice";
import homeReducer from "../features/home/homeSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		allProducts: allProductsReducer,
		singleProduct: singleProductReducer,
		cart: cartReducer,
		home: homeReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),

});

export default store;
export * from "../features/auth/authSlice";
