import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

export const getPaymentMethod = createAsyncThunk(
  'auth/getPaymentMethod',
  async () => {
    try {
      let token: any = await AsyncStorage.getItem('token');

      return await database()
        .ref(`/users/${JSON.parse(token)}/paymentMethods`)
        .once('value')
        .then(snapshot => {
          const responce: any = snapshot.val();

          const data = responce;

          const paymentMethodList: any = {
            cashBalance: [],
            creditCard: [],
            bankWire: [],
            payPal: [],
            eCheck: [],
          };

          Object.values(data).map((item: any) =>
            [...item].map(paymentMethod => {
              if (paymentMethod !== null)
                return paymentMethodList[paymentMethod.paymentMethod].push(
                  paymentMethod,
                );
            }),
          );

          return paymentMethodList;
        });
    } catch (e) {}
  },
);
