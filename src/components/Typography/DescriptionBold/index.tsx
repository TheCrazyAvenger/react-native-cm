import React from 'react';
import {Text} from 'react-native';
import {TextProps} from '../..';

import {styles} from './styles';

export const DescriptionBold: React.FC<TextProps> = ({children, style}) => {
  return <Text style={{...styles.default, ...style}}>{children}</Text>;
};
