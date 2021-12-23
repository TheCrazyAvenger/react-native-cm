import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '@env';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dev-backend.cybermetals.com/api',
  }),
  endpoints: builder => ({
    getDigitalProducts: builder.query({
      query: () => ({
        url: '/digital-products',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {useGetDigitalProductsQuery} = productsApi;
