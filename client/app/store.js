import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import allProductsReducer from "../features/allProducts/allProductsSlice";
import singleProductReducer from "../features/singleProduct/singleProductSlice";
import cartReducer from "../features/cart/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allProducts: allProductsReducer,
    singleProduct: singleProductReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
export * from "../features/auth/authSlice";
