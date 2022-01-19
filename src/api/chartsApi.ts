import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {BASE_URL} from '@env';
console.log(BASE_URL);

export const chartsApi = createApi({
  reducerPath: 'chartsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: builder => ({
    getDigitalProducts: builder.query({
      query: data => ({
        url: `/charts/metals?type=${data.type}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {useGetDigitalProductsQuery} = chartsApi;
