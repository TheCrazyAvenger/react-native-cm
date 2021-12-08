import React from 'react';
import {VerificationForm} from '../../../../forms';
import {Screen} from '@ui';

export const Verification: React.FC = () => {
  return (
    <Screen type="View" style={{paddingHorizontal: 16}}>
      <VerificationForm />
    </Screen>
  );
};
