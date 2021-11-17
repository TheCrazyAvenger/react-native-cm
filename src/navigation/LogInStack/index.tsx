import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../constants';
import {
  ForgotPassDone,
  ForgotPassError,
  ForgotPassSucces,
  ForgotPassword,
  LogIn,
  MobileVerCode,
  Password,
} from '../../screens';

const Stack = createNativeStackNavigator();

export const LogInStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={Screens.logIn}>
      <Stack.Screen name={Screens.logIn} component={LogIn} />
      <Stack.Screen name={Screens.mobileVerCode} component={MobileVerCode} />
      <Stack.Screen name={Screens.forgotPassword} component={ForgotPassword} />
      <Stack.Screen
        name={Screens.forgotPassSucces}
        component={ForgotPassSucces}
      />
      <Stack.Screen
        name={Screens.forgotPassError}
        component={ForgotPassError}
      />
      <Stack.Screen name={Screens.password} component={Password} />
      <Stack.Screen name={Screens.forgotPassDone} component={ForgotPassDone} />
    </Stack.Navigator>
  );
};
