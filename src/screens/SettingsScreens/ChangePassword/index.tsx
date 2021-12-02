import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {PasswordForm} from '../../../forms';
import {Screen} from '@ui';

export const ChangePassword: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <Screen type="View">
      <PasswordForm />
    </Screen>
  );
};
