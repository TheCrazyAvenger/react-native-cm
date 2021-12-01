import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getOperations} from '../actions/operations';

export interface OperationsState {
  operations: {[key: string]: string | number} | any;
}

const initialState: OperationsState = {
  operations: {
    buy: [],
    sell: [],
    fund: [],
    withdraw: [],
    redeem: [],
  },
};

export const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    addOperation: (state, action: PayloadAction<any>) =>
      void state.operations[action.payload.image].push(action.payload),
    deleteOperation: (state, action: PayloadAction<any>) => {
      console.log(action.payload.image);
      state.operations[action.payload.image] = state.operations[
        action.payload.image
      ].filter((item: any) => item.id !== action.payload.id);
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getOperations.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload) {
          state.operations = action.payload;
        }
      },
    );
  },
});
export const {addOperation, deleteOperation} = operationsSlice.actions;

export default operationsSlice.reducer;
