import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {AppNavigator} from './navigation/AppNavigator';

export const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AppNavigator />;
};
