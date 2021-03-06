import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from '@constants';
import {
  ChooseFund,
  ChooseWithdraw,
  CompleteFundWithdraw,
  FundWithDrawSetUp,
  PaymentMethodsSetUp,
  ReviewFundWithdraw,
} from '@screens';
import {BackButton} from '../BackButton';
import {styles} from './styles';
import {useRoute} from '@react-navigation/core';

const Stack = createNativeStackNavigator();

export const FundWithdrawStack: React.FC = () => {
  const route: any = useRoute();

  const {type} = route.params;
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => <BackButton />,
        headerTitleAlign: 'center',
        headerTitleStyle: styles.headerTitleStyle,
        headerShadowVisible: false,
        title: type === 'Fund' ? 'Fund' : 'Withdraw',
      }}
      initialRouteName={
        type === 'Fund' ? Screens.chooseFund : Screens.chooseWithdraw
      }>
      <Stack.Screen name={Screens.chooseFund} component={ChooseFund} />
      <Stack.Screen name={Screens.chooseWithdraw} component={ChooseWithdraw} />
      <Stack.Screen
        name={Screens.fundWithDrawSetUp}
        component={FundWithDrawSetUp}
      />
      <Stack.Screen
        name={Screens.paymentMethodsSetUp}
        component={PaymentMethodsSetUp}
      />
      <Stack.Screen
        name={Screens.reviewFundWithdraw}
        component={ReviewFundWithdraw}
      />
      <Stack.Screen
        name={Screens.completeFundWithdraw}
        component={CompleteFundWithdraw}
      />
    </Stack.Navigator>
  );
};
