import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '@env';
console.log(BASE_URL);

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getChartsData: builder.query({
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

export const {useGetChartsDataQuery} = productsApi;
