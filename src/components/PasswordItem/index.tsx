import React from 'react';
import {View} from 'react-native';
import {PasswordItemProps} from '..';
import {Description} from '@Typography';
import {styles} from './styles';

export const PasswordItem: React.FC<PasswordItemProps> = ({text, color}) => {
  return (
    <View style={styles.container}>
      <View style={{...styles.dot, backgroundColor: color}} />
      <Description style={{color: color}}>{text}</Description>
    </View>
  );
};
