import React from 'react';
import {View} from 'react-native';
import {TextProps} from '..';
import {styles} from './styles';

export const Wrapper: React.FC<TextProps> = ({style}) => {
  return <View style={{...styles.wrapper, ...style}} />;
};
