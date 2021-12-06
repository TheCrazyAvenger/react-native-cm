import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '@env';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getDigitalProducts: builder.query({
      query: () => ({
        url: '/digital-products',
      }),
    }),
  }),
});

export const {useGetDigitalProductsQuery} = productsApi;
