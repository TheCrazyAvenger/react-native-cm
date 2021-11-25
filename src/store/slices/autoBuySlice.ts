import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getAutoBuy} from '../actions/autoBuy';

export interface AutoBuyState {
  autoBuy: Array<{[key: string]: string | number} | null> | any;
}

const initialState: AutoBuyState = {
  autoBuy: [
    {
      metal: 'Gold',
      amount: '1001',
      endDate: '11/22/22',
      frequency: 'Daily',
      id: 1,
      paymentMethod: 'Cash Balance',
      startDate: '11/22/21',
    },
  ],
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
export const {addAutoBuy, deleteAutoBuy, updateAutoBuy} = autoBuySlice.actions;

export default autoBuySlice.reducer;
