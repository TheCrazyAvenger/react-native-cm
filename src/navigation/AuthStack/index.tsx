import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../constants';
import {Onboarding, Welcome} from '../../screens';
import {SignUpStack} from '../SignUpStack';
import {LogInStack} from '../LogInStack';
import {BottomTabs} from '../BottomTabs';
import {useAppSelector} from '../../hooks/hooks';

const Stack = createNativeStackNavigator();

export const AuthStack: React.FC<{showOnBoarding: boolean}> = ({
  showOnBoarding,
}) => {
  const token = useAppSelector(state => state.auth.token);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={
        token
          ? 'bottomTabs'
          : showOnBoarding
          ? Screens.onBoarding
          : Screens.welcome
      }>
      <Stack.Screen name={Screens.onBoarding} component={Onboarding} />
      <Stack.Screen name={Screens.welcome} component={Welcome} />
      <Stack.Screen name={Screens.signUp} component={SignUpStack} />
      <Stack.Screen name={Screens.signIn} component={LogInStack} />
      <Stack.Screen
        name={'bottomTabs'}
        options={{
          headerShown: false,
        }}
        component={BottomTabs}
      />
    </Stack.Navigator>
  );
};
