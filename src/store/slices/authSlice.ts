import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getData, loginHandler, logout} from '../actions/auth';

export interface AuthState {
  firstName: string;
  lastName: string;
  password: string;
  mobile: string;
  token: string | null;
  userEmail: string | null;
  error: any;
  verified: boolean;
  loading: boolean;
  cashBalance: number;
}

const initialState: AuthState = {
  cashBalance: 0,
  firstName: '',
  lastName: '',
  password: '',
  mobile: '',
  token: null,
  userEmail: null,
  error: null,
  verified: false,
  loading: true,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSucces: (state, action: PayloadAction<any>) => {
      const {
        token,
        userEmail,
        verified,
        firstName,
        lastName,
        password,
        mobile,
        cashBalance,
      } = action.payload;
      state.token = token;
      state.verified = verified;
      state.lastName = lastName;
      state.firstName = firstName;
      state.userEmail = userEmail;
      state.password = password;
      state.mobile = mobile;
      state.cashBalance = cashBalance;
    },
    changeName: (state, action: PayloadAction<{[key: string]: string}>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    setVerified: (state, action: PayloadAction<boolean>) => {
      state.verified = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateCash: (state, action: PayloadAction<number>) => {
      state.cashBalance = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getData.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload) {
        const {
          token,
          userEmail,
          verified,
          firstName,
          lastName,
          password,
          mobile,
          cashBalance,
        } = action.payload;

        state.token = token;
        state.verified = verified;
        state.lastName = lastName;
        state.firstName = firstName;
        state.userEmail = userEmail;
        state.password = password;
        state.mobile = mobile;
        state.cashBalance = cashBalance;
      }
    });
    builder.addCase(
      loginHandler.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload) {
          const {mobile} = action.payload;

          state.mobile = mobile;
        }
      },
    );
    builder.addCase(logout.fulfilled, state => {
      state.token = null;
      state.userEmail = null;
    });
  },
});
export const {authSucces, changeName, setVerified, setLoading, updateCash} =
  authSlice.actions;

export default authSlice.reducer;
