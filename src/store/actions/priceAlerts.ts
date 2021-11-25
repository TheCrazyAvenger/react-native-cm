import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

export const getPriceAlerts = createAsyncThunk(
  'auth/getPriceAlerts',
  async () => {
    try {
      let token: any = await AsyncStorage.getItem('token');

      return await database()
        .ref(`/users/${JSON.parse(token)}/priceAlerts`)
        .once('value')
        .then(snapshot => {
          const data: any = snapshot.val();
          const priceAlertsList: any = [];
          data.map(
            (item: any, i: number) =>
              item !== null && priceAlertsList.push(item),
          );
          return priceAlertsList;
        });
    } catch (e) {
      console.log(e);
    }
  },
);
