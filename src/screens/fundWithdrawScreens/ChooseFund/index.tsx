import {PaymentItem} from '@components';
import {Screens} from '@constants';
import {useNavigation} from '@react-navigation/core';
import {Screen} from '@ui';
import React from 'react';
import {StatusBar} from 'react-native';
import {styles} from './styles';

export const ChooseFund: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <PaymentItem
        title="ACH/eCheck"
        image="eCheckBold"
        buttonTitle="Select ACH/eCheck"
        onPress={() =>
          navigation.navigate(Screens.fundWithDrawSetUp, {
            type: 'Fund',
            paymentMethod: 'eCheck',
          })
        }
      />
      <PaymentItem
        title="Bank Wire"
        image="bankWireBold"
        buttonTitle="Select Bank Wire"
        onPress={() =>
          navigation.navigate(Screens.fundWithDrawSetUp, {
            type: 'Fund',
            paymentMethod: 'bankWire',
          })
        }
      />
    </Screen>
  );
};
