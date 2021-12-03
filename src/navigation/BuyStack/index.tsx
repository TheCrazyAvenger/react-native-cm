import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '@constants';
import {
  BuySetUp,
  ChooseBuy,
  CompleteBuy,
  PaymentMethodsSetUp,
  Profile,
  ReviewBuy,
} from '@screens';
import {BackButton} from '../BackButton';
import {styles} from './styles';

const Stack = createNativeStackNavigator();

export const BuyStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitleStyle,
        headerShadowVisible: false,
        headerShown: false,
      }}>
      <Stack.Screen name={Screens.chooseBuy} component={ChooseBuy} />
      <Stack.Screen name={Screens.buySetup} component={BuySetUp} />
      <Stack.Screen name={Screens.reviewBuy} component={ReviewBuy} />
      <Stack.Screen name={Screens.completeBuy} component={CompleteBuy} />
      <Stack.Screen
        name={Screens.paymentMethodsSetUp}
        component={PaymentMethodsSetUp}
      />
      <Stack.Screen name={Screens.profile} component={Profile} />
    </Stack.Navigator>
  );
};
