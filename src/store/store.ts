import {configureStore} from '@reduxjs/toolkit';
import {authApi} from '../api';
import authSlice from './slices/authSlice';
import autoBuySlice from './slices/autoBuySlice';
import priceAlertSlice from './slices/priceAlertSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
    autoBuy: autoBuySlice,
    priceAlerts: priceAlertSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
