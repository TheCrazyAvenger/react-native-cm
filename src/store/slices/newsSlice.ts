import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getNews} from '../actions/news';

export interface NewsState {
  news: Array<{[key: string]: string | number} | null> | any;
}

const initialState: NewsState = {
  news: [],
};

export const newsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getNews.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.news = action.payload;
      }
    });
  },
});

export default newsSlice.reducer;
