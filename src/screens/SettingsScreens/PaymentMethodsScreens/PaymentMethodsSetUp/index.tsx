import React from 'react';
import {PaymentMethodsSetUpForm} from '../../../../forms';
import {Screen} from '@ui';

export const PaymentMethodsSetUp: React.FC = () => {
  return (
    <Screen type="View" style={{paddingHorizontal: 16}}>
      <PaymentMethodsSetUpForm />
    </Screen>
  );
};
