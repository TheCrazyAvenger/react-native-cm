import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

export const getData = createAsyncThunk('auth/getData', async () => {
  try {
    let token: any = await AsyncStorage.getItem('token');

    return await database()
      .ref(`/users/${JSON.parse(token)}`)
      .once('value')
      .then(snapshot => {
        const data: any = snapshot.val();

        const {
          userEmail,
          mobile,
          password,
          firstName,
          lastName,
          token,
          verified,
          cashBalance,
          legalAdress,
          shippingAdress,
          ownedMetals,
          loginMethods,
          notifications,
        } = data;

        if (
          token === null &&
          userEmail === null &&
          firstName === null &&
          lastName === null &&
          password === null &&
          verified === null &&
          mobile === null &&
          cashBalance === null &&
          legalAdress === null &&
          shippingAdress === null &&
          ownedMetals === null &&
          notifications === null
        ) {
          return {
            data: {
              token: null,
              userEmail: null,
              firstName: '',
              lastName: '',
              password: '',
              mobile: '',
              verified: false,
              cashBalance: 0,
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
              loginMethods: {
                touchId: false,
                faceId: false,
                passcode: null,
              },
              notifications: {
                transactions: false,
                promotions: false,
                marketNews: false,
              },
            },
            error: 'Unable to get data.',
          };
        } else {
          return {
            data: {
              token,
              userEmail,
              firstName,
              lastName,
              password,
              verified,
              mobile,
              cashBalance,
              legalAdress,
              shippingAdress,
              ownedMetals,
              loginMethods: loginMethods
                ? loginMethods
                : {
                    touchId: false,
                    faceId: false,
                    passcode: null,
                  },
              notifications,
            },
            error: null,
          };
        }
      })
      .catch(e => console.log(e));
  } catch (e) {}
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (e) {}
});

export const loginHandler = createAsyncThunk('auth/loginHandler', async () => {
  try {
    let token: any = await AsyncStorage.getItem('loginToken');

    return await database()
      .ref(`/users/${JSON.parse(token)}`)
      .once('value')
      .then(async snapshot => {
        const data: any = snapshot.val();

        const {mobile} = data;

        await AsyncStorage.setItem('mobile', JSON.stringify(mobile));
      });
  } catch (e) {
    await AsyncStorage.removeItem('loginToken');
  }
});
