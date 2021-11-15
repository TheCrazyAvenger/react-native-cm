import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Text} from 'react-native';

export const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <Text>CyberMetal</Text>;
};
