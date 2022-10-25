import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import allProductsReducer from '../features/allProducts/AllProductsSlice';
import singleProductReducer from "../features/singleProduct/singleProductSlice";

import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    allProducts: allProductsReducer,
    singleProduct: singleProductReducer,
   },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
