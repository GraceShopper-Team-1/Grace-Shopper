import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import allProductsReducer from "../features/allProducts/allProductsSlice";
import singleProductReducer from "../features/singleProduct/singleProductSlice";
import cartReducer from "../features/cart/cartSlice";
import userReducer from "../features/admin/users/usersSlice";
import ordersReducer from "../features/admin/orders/ordersSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		allProducts: allProductsReducer,
		singleProduct: singleProductReducer,
		cart: cartReducer,
		user: userReducer,
		orders: ordersReducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
export * from "../features/auth/authSlice";
