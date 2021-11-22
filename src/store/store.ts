import {configureStore} from '@reduxjs/toolkit';
import {authApi} from '../api';
import authSlice from './slices/authSlice';
import autoBuySlice from './slices/autoBuySlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice,
    autoBuy: autoBuySlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
