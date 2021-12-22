import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAutoBuy} from '../actions/autoBuy';

export interface AutoBuyState {
  autoBuy: Array<{[key: string]: string | number} | null> | any;
}

const initialState: AutoBuyState = {
  autoBuy: [],
};

export const autoBuySlice = createSlice({
  name: 'autoBuy',
  initialState,
  reducers: {
    addAutoBuy: (state, action: PayloadAction<any>) =>
      void state.autoBuy.push(action.payload),
    deleteAutoBuy: (state, action: PayloadAction<any>) => {
      state.autoBuy = state.autoBuy.filter(
        (item: any) => item.id !== action.payload,
      );
    },
    updateAutoBuy: (state, action: PayloadAction<any>) => {
      state.autoBuy = [
        ...state.autoBuy.map((item: any) => {
          if (item.id === action.payload.id) {
            return (item = action.payload);
          }
          return item;
        }),
      ];
    },
    cleanAutoBuy: state => {
      state.autoBuy = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getAutoBuy.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload) {
          state.autoBuy = action.payload;
        }
      },
    );
  },
});
export const {addAutoBuy, deleteAutoBuy, updateAutoBuy, cleanAutoBuy} =
  autoBuySlice.actions;

export default autoBuySlice.reducer;
