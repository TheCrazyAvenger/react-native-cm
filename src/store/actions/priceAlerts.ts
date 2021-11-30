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
          const responce: any = snapshot.val();

          const data = responce;

          const priceAlertsList: any = {
            Gold: [],
            Silver: [],
            Palladium: [],
            Platinum: [],
          };

          [...Object.values(data)].map((item: any, i: number) => {
            [...item].map((metals: any, i: number) => {
              if (metals !== null)
                return priceAlertsList[metals.metal].push(metals);
            });
          });
          return priceAlertsList;
        });
    } catch (e) {
      console.log(e);
    }
  },
);
