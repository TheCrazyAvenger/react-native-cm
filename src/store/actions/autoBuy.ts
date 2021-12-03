import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

export const getAutoBuy = createAsyncThunk('auth/getAutoBuy', async () => {
  try {
    let token: any = await AsyncStorage.getItem('token');

    return await database()
      .ref(`/users/${JSON.parse(token)}/autoBuy`)
      .once('value')
      .then(snapshot => {
        const data: any = snapshot.val();
        const autoBuyList: any = [];
        [...Object.values(data)].map(
          (item: any, i: number) => item !== null && autoBuyList.push(item),
        );

        return autoBuyList;
      });
  } catch (e) {
    console.log(e);
  }
});
