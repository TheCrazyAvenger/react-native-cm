import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../constants';
import {Onboarding, Welcome} from '../../screens';
import {SignUpStack} from '../SignUpStack';
import {LogInStack} from '../LogInStack';

const Stack = createNativeStackNavigator();

export const AuthStack: React.FC<{showOnBoarding: boolean}> = ({
  showOnBoarding,
}) => {
  console.log(showOnBoarding);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={showOnBoarding ? Screens.onBoarding : Screens.welcome}>
      <Stack.Screen name={Screens.onBoarding} component={Onboarding} />
      <Stack.Screen name={Screens.welcome} component={Welcome} />
      <Stack.Screen name={Screens.signUp} component={SignUpStack} />
      <Stack.Screen name={Screens.signIn} component={LogInStack} />
    </Stack.Navigator>
  );
};
