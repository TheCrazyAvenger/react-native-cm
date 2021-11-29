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
          const data: any = snapshot.val();
          const paymentMethodList: any = [];
          data.map(
            (item: any, i: number) =>
              item !== null && paymentMethodList.push(item),
          );
          return paymentMethodList;
        });
    } catch (e) {
      console.log(e);
    }
  },
);
