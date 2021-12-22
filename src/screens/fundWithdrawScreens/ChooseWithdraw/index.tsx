import {EmptyDataScreen, PaymentItem} from '@components';
import {colors, Screens} from '@constants';
import {useAppSelector} from '@hooks';
import {useNavigation} from '@react-navigation/native';
import {Screen} from '@ui';
import React from 'react';
import {StatusBar} from 'react-native';
import {styles} from './styles';

export const ChooseWithdraw: React.FC = () => {
  const navigation: any = useNavigation();

  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );

  if (
    paymentMethods.bankWire.length === 0 &&
    paymentMethods.eCheck.length === 0
  ) {
    return (
      <EmptyDataScreen
        descriptionStyle={{color: colors.black}}
        text="There are no available payment methods.
    Please call your CyberMetals Support Team at 855-903-3449"
      />
    );
  }

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
            type: 'Withdraw',
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
            type: 'Withdraw',
            paymentMethod: 'bankWire',
          })
        }
      />
    </Screen>
  );
};
