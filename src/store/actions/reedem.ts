import {createAsyncThunk} from '@reduxjs/toolkit';
import database from '@react-native-firebase/database';

export const getReedem = createAsyncThunk('reedem/getReedem', async () => {
  try {
    return await database()
      .ref(`/reedem`)
      .once('value')
      .then(snapshot => {
        const responce: any = snapshot.val();

        const data = responce;

        return [...Object.values(data)].filter(item => item !== null);
      });
  } catch (e) {}
});
