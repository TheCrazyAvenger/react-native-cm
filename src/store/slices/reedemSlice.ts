import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getReedem} from '@store/actions/reedem';

export interface ReedemState {
  redeem: {[key: string]: any};
  cart: any;
}

const initialState: ReedemState = {
  redeem: [],
  cart: [],
};

export const reedemSlice = createSlice({
  name: 'reedem',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<any>) => {
      state.cart = action.payload;
    },
    deleteCart: (state, action: PayloadAction<any>) => {
      state.cart = state.cart.filter(
        (item: any) => item.name !== action.payload,
      );
    },
    updateCart: (state, action: PayloadAction<any>) => {
      const {qty, name} = action.payload;
      state.cart = state.cart.map((item: any) => {
        if (item.name === name) {
          return {...item, qty};
        }
        return item;
      });
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getReedem.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.redeem = action.payload;
      },
    );
  },
});
export const {addCart, deleteCart, updateCart} = reedemSlice.actions;

export default reedemSlice.reducer;
