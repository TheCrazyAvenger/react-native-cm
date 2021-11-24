import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const getData = createAsyncThunk('auth/getData', async () => {
  try {
    let token = await AsyncStorage.getItem('token');
    let userEmail = await AsyncStorage.getItem('userEmail');
    let firstName = await AsyncStorage.getItem('firstName');
    let lastName = await AsyncStorage.getItem('lastName');
    let password = await AsyncStorage.getItem('password');
    let verified = await AsyncStorage.getItem('verified');
    console.log(token, userEmail, firstName, lastName, password, verified);
    if (
      token === null &&
      userEmail === null &&
      firstName === null &&
      lastName === null &&
      password === null &&
      verified === null
    ) {
      return {
        token: null,
        userEmail: null,
        firstName: '',
        lastName: '',
        password: '',
        verified: false,
      };
    } else {
      return {
        token: JSON.parse(token!),
        userEmail: JSON.parse(userEmail!),
        firstName: JSON.parse(firstName!),
        lastName: JSON.parse(lastName!),
        password: JSON.parse(password!),
        verified: JSON.parse(verified!),
      };
    }
  } catch (e) {
    console.log(e);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    // await AsyncStorage.removeItem('firstName');
    // await AsyncStorage.removeItem('lastName');
    // await AsyncStorage.removeItem('password');
    await AsyncStorage.removeItem('userEmail');
    await AsyncStorage.removeItem('token');
    // await AsyncStorage.removeItem('verified');
  } catch (e) {
    console.log(e);
  }
});
