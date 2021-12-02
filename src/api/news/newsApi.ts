import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://qa-backend.jmgoldx.com/api/',
  }),
  endpoints: builder => ({
    getFullNews: builder.mutation({
      query: () => ({
        method: 'GET',
        url: '/show-market-news',
      }),
    }),
    getNewsById: builder.mutation({
      query: id => ({
        method: 'GET',
        url: `/show-market-news-one?id=${id}`,
      }),
    }),
  }),
});

export const {useGetFullNewsMutation, useGetNewsByIdMutation} = newsApi;
