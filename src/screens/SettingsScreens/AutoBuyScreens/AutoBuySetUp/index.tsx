import React from 'react';
import {View} from 'react-native';
import {AutoBuySetUpForm} from '../../../../forms';
import {Screen} from '@ui';
import {styles} from './styles';

export const AutoBuySetup: React.FC = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <AutoBuySetUpForm />
      </View>
    </Screen>
  );
};
