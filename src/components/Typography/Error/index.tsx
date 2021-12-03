import React from 'react';
import {Text} from 'react-native';
import {TextProps} from '../..';

import {styles} from './styles';

export const Error: React.FC<TextProps> = ({children, style}) => {
  return (
    <Text numberOfLines={1} style={{...styles.default, ...style}}>
      {children}
    </Text>
  );
};
