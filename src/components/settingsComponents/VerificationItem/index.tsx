import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {Description} from '@Typography';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const VerificationItem: React.FC = () => {
  const verified = useAppSelector(state => state.auth.verified);

  return (
    <View
      style={{
        ...styles.verified,
        borderColor: verified ? 'green' : colors.red,
      }}>
      <Description style={{color: verified ? 'green' : colors.red}}>
        {verified ? 'Verified' : 'Unverified'}
      </Description>
    </View>
  );
};
