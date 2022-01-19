import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

export const getOperations = createAsyncThunk(
  'operations/getOperations',
  async () => {
    try {
      let token: any = await AsyncStorage.getItem('token');

      return await database()
        .ref(`/users/${JSON.parse(token)}/operations`)
        .once('value')
        .then(snapshot => {
          const responce: any = snapshot.val();

          const data = responce;

          return [...Object.values(data)];
        });
    } catch (e) {}
  },
);
