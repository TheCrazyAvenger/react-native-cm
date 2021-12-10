import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://qa-backend.jmgoldx.com/api/',
  }),
  endpoints: builder => ({
    getFullNews: builder.query({
      query: () => ({
        url: '/show-market-news',
      }),
    }),
    getNews: builder.query({
      query: () => ({
        url: '/show-market-news?limit=4',
      }),
    }),
    getNewsById: builder.mutation({
      query: url => ({
        method: 'GET',
        url: `/show-market-news-one?url=${url}`,
      }),
    }),
  }),
});

export const {useGetFullNewsQuery, useGetNewsByIdMutation, useGetNewsQuery} =
  newsApi;
