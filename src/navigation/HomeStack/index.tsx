import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../constants';
import {Holdings, Home} from '../../screens';

const Stack = createNativeStackNavigator();

export const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.home} component={Home} />
      <Stack.Screen name={Screens.holdings} component={Holdings} />
    </Stack.Navigator>
  );
};
