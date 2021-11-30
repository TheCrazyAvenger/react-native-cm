import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rn-progressio-ccdee-default-rtdb.firebaseio.com/',
  }),
  endpoints: builder => ({
    auth: builder.mutation({
      query: data => {
        const {email, password, isLogin} = data;

        const authData = {
          email,
          password,

          returnSecureToken: true,
        };

        let url =
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBinqqK8HFOKtfasZ1u4nvXOd2WSDQlF5Y';
        if (isLogin) {
          url =
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBinqqK8HFOKtfasZ1u4nvXOd2WSDQlF5Y';
        }

        return {
          url,
          method: 'POST',
          body: authData,
        };
      },
    }),
  }),
});

export const {useAuthMutation} = authApi;
