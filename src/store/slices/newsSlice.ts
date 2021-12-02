import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface NewsState {
  news: Array<{[key: string]: string | number} | null> | any;
}

const initialState: NewsState = {
  news: [],
};

export const newsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {
    addNews: (state, action: PayloadAction<any>) => {
      state.news = action.payload;
    },
  },
});

export const {addNews} = newsSlice.actions;

export default newsSlice.reducer;
