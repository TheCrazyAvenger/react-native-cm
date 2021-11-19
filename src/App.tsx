import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import {useAppDispatch} from './hooks/hooks';
import {AppNavigator} from './navigation/AppNavigator';
import {getData} from './store/actions';
import {store} from './store/store';

export const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};
