import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {LoadingItem} from '@components';
import {PaymentMethodsSetUpForm} from '../../../../forms';
import {useAppSelector} from '@hooks';
import {Screen} from '@ui';

export const PaymentMethodsSetUp: React.FC = () => {
  const navigation: any = useNavigation();

  const loading = useAppSelector(state => state.auth.loading);

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <Screen type="View" style={{paddingHorizontal: 16}}>
      <PaymentMethodsSetUpForm />
    </Screen>
  );
};
