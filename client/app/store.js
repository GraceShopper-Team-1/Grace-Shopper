import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import AllProductsSlice from '../features/allProducts/AllProductsSlice';

import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    allProducts: AllProductsSlice
   },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
