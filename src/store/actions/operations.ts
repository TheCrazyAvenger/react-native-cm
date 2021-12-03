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

          const operationsList: any = {
            buy: [],
            sell: [],
            fund: [],
            withdraw: [],
            redeem: [],
          };

          Object.values(data).map((item: any) =>
            [...item].map(operation => {
              if (operation !== null)
                return operationsList[operation.image].push(operation);
            }),
          );
          return operationsList;
        });
    } catch (e) {
      console.log(e);
    }
  },
);
