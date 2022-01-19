import {configureStore} from '@reduxjs/toolkit';
import {productsApi, newsApi, chartsApi} from '@api';
import authSlice from './slices/authSlice';
import autoBuySlice from './slices/autoBuySlice';
import operationsSlice from './slices/operationsSlice';
import paymentMethodsSlice from './slices/paymentMethodsSlice';
import priceAlertSlice from './slices/priceAlertSlice';
import reedemSlice from './slices/reedemSlice';

export const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [chartsApi.reducerPath]: chartsApi.reducer,
    auth: authSlice,
    autoBuy: autoBuySlice,
    priceAlerts: priceAlertSlice,
    paymentMethod: paymentMethodsSlice,
    operations: operationsSlice,
    reedem: reedemSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      newsApi.middleware,
      productsApi.middleware,
      chartsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
