import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../constants';
import {Onboarding, Welcome} from '../../screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SignUpStack} from '../SignUpStack';

const Stack = createNativeStackNavigator();

export const AuthStack: React.FC = () => {
  const [showOnBoarding, setShowOnboarding] = useState(true);

  // const checkOnboarding = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('@viewedOnboarding');
  //     await AsyncStorage.removeItem('@viewedOnboarding');
  //     console.log(typeof value);
  //     if (value === 'true') return setShowOnboarding(false);

  //     return setShowOnboarding(true);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // useEffect(() => {
  //   checkOnboarding();
  // }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={showOnBoarding ? Screens.onBoarding : Screens.welcome}>
      <Stack.Screen name={Screens.onBoarding} component={Onboarding} />
      <Stack.Screen name={Screens.welcome} component={Welcome} />
      <Stack.Screen name={Screens.signUp} component={SignUpStack} />
    </Stack.Navigator>
  );
};
