import {MaterialTopTabBar} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const PriceAlertsHeader: React.FC<{
  props: any;
}> = ({props}) => {
  return (
    <View>
      <MaterialTopTabBar {...props} />
      <View style={styles.underLineCard}>
        <View style={styles.underLine} />
      </View>
    </View>
  );
};
