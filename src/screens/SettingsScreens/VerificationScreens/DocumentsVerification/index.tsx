import React, {useEffect} from 'react';
import {DocumentsVerificationForm} from '../../../../forms';
import {Screen} from '@ui';
import {useNavigation} from '@react-navigation/core';

export const DocumentsVerification: React.FC = () => {
  const navigation: any = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'Documents Verification',
    });
  }, []);

  return (
    <Screen type="View">
      <DocumentsVerificationForm />
    </Screen>
  );
};
