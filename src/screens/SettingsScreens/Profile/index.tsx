import React from 'react';
import {ProfileForm} from '../../../forms';
import {Screen} from '../../../ui';

export const Profile: React.FC = () => {
  return (
    <Screen type="View">
      <ProfileForm />
    </Screen>
  );
};
