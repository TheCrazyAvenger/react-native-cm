import React from 'react';
import {BillingForm} from '../../../forms';
import {Screen} from '@ui';

export const Billing: React.FC = () => {
  return (
    <Screen style={{paddingHorizontal: 16}}>
      <BillingForm />
    </Screen>
  );
};
