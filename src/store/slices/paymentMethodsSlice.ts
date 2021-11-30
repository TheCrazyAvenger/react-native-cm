import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getPaymentMethod} from '../actions/paymentMethod';

export interface PaymentMethodsState {
  paymentMethods: Array<{[key: string]: string | number} | any>;
}

const initialState: PaymentMethodsState = {
  paymentMethods: [],
};

export const paymentMethodsSlice = createSlice({
  name: 'paymentMethodsSlice',
  initialState,
  reducers: {
    addPaymentMethods: (state, action: PayloadAction<any>) =>
      void state.paymentMethods.push(action.payload),
    deletePaymentMethods: (state, action: PayloadAction<any>) => {
      state.paymentMethods = state.paymentMethods.filter(
        (item: any) => item.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getPaymentMethod.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload) {
          state.paymentMethods = action.payload;
        }
      },
    );
  },
});
export const {addPaymentMethods, deletePaymentMethods} =
  paymentMethodsSlice.actions;

export default paymentMethodsSlice.reducer;
