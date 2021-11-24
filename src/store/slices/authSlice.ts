import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getData, logout} from '../actions/auth';

export interface AuthState {
  firstName: string;
  lastName: string;
  password: string;
  token: string | null;
  userEmail: string | null;
  error: any;
  verified: boolean;
}

const initialState: AuthState = {
  firstName: '',
  lastName: '',
  password: '',
  token: null,
  userEmail: null,
  error: null,
  verified: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSucces: (state, action: PayloadAction<any>) => {
      const {token, userEmail, verified, firstName, lastName, password} =
        action.payload;
      state.token = token;
      state.verified = verified;
      state.lastName = lastName;
      state.firstName = firstName;
      state.userEmail = userEmail;
      state.password = password;
    },
    changeName: (state, action: PayloadAction<{[key: string]: string}>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    setVerified: (state, action: PayloadAction<boolean>) => {
      state.verified = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action: PayloadAction<any>) => {
      const {token, userEmail, verified, firstName, lastName, password} =
        action.payload;
      state.token = token;
      state.verified = verified;
      state.lastName = lastName;
      state.firstName = firstName;
      state.userEmail = userEmail;
      state.password = password;
    });
    builder.addCase(logout.fulfilled, state => {
      state.token = null;
      state.userEmail = null;
    });
  },
});
export const {authSucces, changeName, setVerified} = authSlice.actions;

export default authSlice.reducer;
