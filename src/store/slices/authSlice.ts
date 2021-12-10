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
  legalAdress: {[key: string]: string | null | number};
  shippingAdress: {[key: string]: string | null | number};
  ownedMetals: {[key: string]: number};
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
  loading: false,
  legalAdress: {
    streetAdress: '',
    city: '',
    state: '',
    postalCode: '',
  },
  shippingAdress: {
    streetAdress: '',
    city: '',
    state: '',
    postalCode: '',
  },
  ownedMetals: {
    Gold: 0,
    Silver: 0,
    Palladium: 0,
    Platinum: 0,
  },
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
        legalAdress,
        shippingAdress,
        ownedMetals,
      } = action.payload;
      state.token = token;
      state.verified = verified;
      state.lastName = lastName;
      state.firstName = firstName;
      state.userEmail = userEmail;
      state.password = password;
      state.mobile = mobile;
      state.cashBalance = cashBalance;
      state.legalAdress = legalAdress;
      state.shippingAdress = shippingAdress;
      state.ownedMetals = ownedMetals;
    },
    changeName: (state, action: PayloadAction<{[key: string]: string}>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    setAdress: (state, action: PayloadAction<any>) => {
      const {legalAdress, shippingAdress} = action.payload;
      state.legalAdress = legalAdress;
      state.shippingAdress = shippingAdress;
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
    updateOwnedMetals: (state, action: PayloadAction<any>) => {
      const {name, newAmount} = action.payload;

      state.ownedMetals[name] = newAmount;
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
          legalAdress,
          shippingAdress,
          ownedMetals,
        } = action.payload;

        state.token = token;
        state.verified = verified;
        state.lastName = lastName;
        state.firstName = firstName;
        state.userEmail = userEmail;
        state.password = password;
        state.mobile = mobile;
        state.cashBalance = cashBalance;
        state.legalAdress = legalAdress;
        state.shippingAdress = shippingAdress;
        state.ownedMetals = ownedMetals;
      }
    });
    builder.addCase(
      loginHandler.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload) {
          state.mobile = action.payload;
        }
      },
    );
    builder.addCase(logout.fulfilled, state => {
      state.token = null;
      state.userEmail = null;
      state.cashBalance = 0;
      state.firstName = '';
      state.lastName = '';
      state.password = '';
      state.mobile = '';
      state.token = null;
      state.userEmail = null;
      state.error = null;
      state.verified = false;
      state.loading = true;
      state.legalAdress = {
        streetAdress: null,
        city: null,
        state: null,
        postalCode: null,
      };
      state.shippingAdress = {
        streetAdress: null,
        city: null,
        state: null,
        postalCode: null,
      };
      state.ownedMetals = {
        Gold: 0,
        Silver: 0,
        Palladium: 0,
        Platinum: 0,
      };
    });
  },
});
export const {
  authSucces,
  changeName,
  setVerified,
  setLoading,
  updateCash,
  setAdress,
  updateOwnedMetals,
} = authSlice.actions;

export default authSlice.reducer;
