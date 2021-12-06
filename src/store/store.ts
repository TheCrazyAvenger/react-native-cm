import {configureStore} from '@reduxjs/toolkit';
import {productsApi, authApi, newsApi} from '@api';
import authSlice from './slices/authSlice';
import autoBuySlice from './slices/autoBuySlice';
import operationsSlice from './slices/operationsSlice';
import paymentMethodsSlice from './slices/paymentMethodsSlice';
import priceAlertSlice from './slices/priceAlertSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    auth: authSlice,
    autoBuy: autoBuySlice,
    priceAlerts: priceAlertSlice,
    paymentMethod: paymentMethodsSlice,
    operations: operationsSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      newsApi.middleware,
      productsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
