import React from 'react';
import {View} from 'react-native';
import {ScreenProps} from '..';
import {styles} from './styles';

export const Screen: React.FC<ScreenProps> = ({children, style}) => {
  return <View style={{...styles.container, ...style}}>{children}</View>;
};
