import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {LoadingItem} from '../../../../components';
import {PaymentMethodsSetUpForm} from '../../../../forms';
import {useAppSelector} from '../../../../hooks/hooks';
import {Screen} from '../../../../ui';
import {styles} from './styles';

export const PaymentMethodsSetUp: React.FC = () => {
  const navigation: any = useNavigation();

  const loading = useAppSelector(state => state.auth.loading);

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <Screen style={{paddingHorizontal: 16}}>
      <PaymentMethodsSetUpForm />
    </Screen>
  );
};
