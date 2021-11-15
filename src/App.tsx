import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Text} from 'react-native';
import {Onboarding} from './screens/Onboarding';

export const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Onboarding />;
};
