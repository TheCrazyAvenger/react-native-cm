import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '@constants';
import {
  Email,
  EmailVerError,
  EmailVerification,
  EmailVerSuccess,
  Home,
  Introduce,
  MobileVerCode,
  MobileVerification,
  MobileVerSuccess,
  Password,
} from '@screens';

const Stack = createNativeStackNavigator();

export const SignUpStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Screens.introduce}>
      <Stack.Screen name={Screens.introduce} component={Introduce} />
      <Stack.Screen name={Screens.email} component={Email} />
      <Stack.Screen name={Screens.password} component={Password} />
      <Stack.Screen
        name={Screens.emailVerification}
        component={EmailVerification}
      />
      <Stack.Screen
        name={Screens.emailVerSuccess}
        component={EmailVerSuccess}
      />
      <Stack.Screen name={Screens.emailVerError} component={EmailVerError} />
      <Stack.Screen
        name={Screens.mobileVerification}
        component={MobileVerification}
      />
      <Stack.Screen name={Screens.mobileVerCode} component={MobileVerCode} />
      <Stack.Screen
        name={Screens.mobileVerSuccess}
        component={MobileVerSuccess}
      />
      <Stack.Screen name={Screens.home} component={Home} />
    </Stack.Navigator>
  );
};
