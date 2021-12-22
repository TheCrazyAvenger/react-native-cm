import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getPaymentMethod} from '../actions/paymentMethod';

export interface PaymentMethodsState {
  paymentMethods: {[key: string]: string | number} | any;
}

const initialState: PaymentMethodsState = {
  paymentMethods: {
    cashBalance: [],
    creditCard: [],
    bankWire: [],
    payPal: [],
    eCheck: [],
  },
};

export const paymentMethodsSlice = createSlice({
  name: 'paymentMethodsSlice',
  initialState,
  reducers: {
    addPaymentMethods: (state, action: PayloadAction<any>) =>
      void state.paymentMethods[action.payload.paymentMethod].push(
        action.payload,
      ),
    deletePaymentMethods: (state, action: PayloadAction<any>) => {
      state.paymentMethods[action.payload.paymentMethod] = state.paymentMethods[
        action.payload.paymentMethod
      ].filter((item: any) => item.id !== action.payload.id);
    },
    cleanPaymentMethods: state => {
      state.paymentMethods = {
        cashBalance: [],
        creditCard: [],
        bankWire: [],
        payPal: [],
        eCheck: [],
      };
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
export const {addPaymentMethods, deletePaymentMethods, cleanPaymentMethods} =
  paymentMethodsSlice.actions;

export default paymentMethodsSlice.reducer;
