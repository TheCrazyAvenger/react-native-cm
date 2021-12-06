import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '@constants';
import {
  SellBuySetUp,
  ChooseBuy,
  ChooseSell,
  CompleteSellBuy,
  PaymentMethodsSetUp,
  Profile,
  ReviewSellBuy,
} from '@screens';
import {BackButton} from '../BackButton';
import {styles} from './styles';
import {useRoute} from '@react-navigation/core';

const Stack = createNativeStackNavigator();

export const BuyStack: React.FC = () => {
  const route: any = useRoute();

  const {type} = route.params;
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitleStyle,
        headerShadowVisible: false,
        title: type === 'Sell' ? 'Sell' : 'Buy',
      }}
      initialRouteName={
        type === 'Buy' ? Screens.chooseBuy : Screens.chooseSell
      }>
      <Stack.Screen name={Screens.chooseSell} component={ChooseSell} />
      <Stack.Screen name={Screens.chooseBuy} component={ChooseBuy} />
      <Stack.Screen name={Screens.sellBuySetup} component={SellBuySetUp} />
      <Stack.Screen name={Screens.reviewSellBuy} component={ReviewSellBuy} />
      <Stack.Screen
        name={Screens.completeSellBuy}
        component={CompleteSellBuy}
      />
      <Stack.Screen
        name={Screens.paymentMethodsSetUp}
        component={PaymentMethodsSetUp}
      />
      <Stack.Screen name={Screens.profile} component={Profile} />
    </Stack.Navigator>
  );
};
