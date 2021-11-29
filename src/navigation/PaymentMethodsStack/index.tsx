import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '../../constants';
import {PaymentMethods, PaymentMethodsSetUp} from '../../screens';
import {Notification} from '../../components';

const Stack = createNativeStackNavigator();

export const PaymentMethodsStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.paymentMethods} component={PaymentMethods} />
      <Stack.Screen
        name={Screens.paymentMethodsSetUp}
        component={PaymentMethodsSetUp}
      />
    </Stack.Navigator>
  );
};
