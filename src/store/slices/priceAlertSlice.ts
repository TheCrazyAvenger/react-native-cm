import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Gold} from '../../assets/images/settings';

export interface PriceAlertsState {
  priceAlerts: Array<{[key: string]: string | number} | any>;
}

const initialState: PriceAlertsState = {
  priceAlerts: [
    {
      metal: 'Gold',
      color: '#FFBD00',
      backgroundColor: '#FFEDBB',
      condition: 'Increases By',
      value: 1.05,
      date: '06/14/21',
      time: '12:34:33',
      id: 1,
    },
    {
      metal: 'Gold',
      color: '#FFBD00',
      backgroundColor: '#FFEDBB',
      condition: 'Decreases By',
      value: 2.0,
      date: '06/14/21',
      time: '12:35:43',
      id: 2,
    },
    {
      metal: 'Silver',
      color: '#2F80ED',
      backgroundColor: '#B7D5FF',
      condition: 'Increases By',
      value: 4.0,
      date: '06/14/21',
      time: '12:36:23',
      id: 3,
    },
    {
      metal: 'Platinum',
      color: '#219653',
      backgroundColor: '#B9DFC9',
      condition: 'Decreases By',
      value: 2.0,
      date: '07/14/21',
      time: '13:23:12',
      id: 4,
    },
    {
      metal: 'Palladium',
      color: '#F2994A',
      backgroundColor: '#F8D5B5',
      condition: 'Decreases By',
      value: 0.12,
      date: '09/14/21',
      time: '23:12:43',
      id: 5,
    },
  ],
};

export const priceAlertSlice = createSlice({
  name: 'priceAlerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<any>) =>
      void state.priceAlerts.push(action.payload),
    deletePriceAlerts: (state, action: PayloadAction<any>) => {
      state.priceAlerts = state.priceAlerts.filter(
        (item: any) => item.id !== action.payload,
      );
    },
    updatePriceAlerts: (state, action: PayloadAction<any>) => {
      state.priceAlerts = [
        ...state.priceAlerts.map((item: any) => {
          if (item.id === action.payload.id) {
            return (item = action.payload);
          }
          return item;
        }),
      ];
    },
  },
});
export const {addAlert, deletePriceAlerts, updatePriceAlerts} =
  priceAlertSlice.actions;

export default priceAlertSlice.reducer;
