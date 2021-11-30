import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getPriceAlerts} from '../actions/priceAlerts';

export interface PriceAlertsState {
  priceAlerts: {[key: string]: string | number} | any;
}

const initialState: PriceAlertsState = {
  priceAlerts: {
    Gold: [],
    Silver: [],
    Palladium: [],
    Platinum: [],
  },
};

export const priceAlertSlice = createSlice({
  name: 'priceAlerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<any>) =>
      void state.priceAlerts[action.payload.metal].push(action.payload),
    deletePriceAlerts: (state, action: PayloadAction<any>) => {
      console.log(action.payload.metal);
      state.priceAlerts[action.payload.metal] = state.priceAlerts[
        action.payload.metal
      ].filter((item: any) => item.id !== action.payload.id);
    },
    updatePriceAlerts: (state, action: PayloadAction<any>) => {
      state.priceAlerts[action.payload.metal] = [
        ...state.priceAlerts[action.payload.metal].map((item: any) => {
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
      getPriceAlerts.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload) {
          state.priceAlerts = action.payload;
        }
      },
    );
  },
});
export const {addAlert, deletePriceAlerts, updatePriceAlerts} =
  priceAlertSlice.actions;

export default priceAlertSlice.reducer;
