import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

export const getNews = createAsyncThunk('news/getData', async () => {
  try {
    return await database()
      .ref(`/news/`)
      .once('value')
      .then(snapshot => {
        const data: any = snapshot.val();
        // console.log(data);

        if (data === null) {
          return [];
        } else {
          return data;
        }
      });
  } catch (e) {
    console.log(e);
  }
});
