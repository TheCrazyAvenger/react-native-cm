import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getOperations} from '../actions/operations';

export interface OperationsState {
  operations: any;
}

const initialState: OperationsState = {
  operations: [],
};

export const operationsSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    addOperation: (state, action: PayloadAction<any>) =>
      void state.operations.push(action.payload),
    deleteOperation: (state, action: PayloadAction<any>) => {
      state.operations = state.operations.filter(
        (item: any) => item.id !== action.payload.id,
      );
    },
    cleanOperations: state => {
      state.operations = [];
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
export const {addOperation, deleteOperation, cleanOperations} =
  operationsSlice.actions;

export default operationsSlice.reducer;
