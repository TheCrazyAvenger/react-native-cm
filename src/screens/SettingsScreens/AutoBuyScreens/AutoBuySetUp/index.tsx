import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {Description, TitleMedium} from '../../../../components/Typography';
import {Screen} from '../../../../ui';

import {styles} from './styles';

export const AutoBuySetup: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <Screen>
      <View style={styles.container}>
        <TitleMedium style={styles.title}>Set Up Auto Buy </TitleMedium>
        {/* Add form */}
        <View style={styles.datePicker}>
          <View>
            <Description>Strat Date</Description>
          </View>
          <View>
            <Description>End Date</Description>
          </View>
        </View>
      </View>
    </Screen>
  );
};
