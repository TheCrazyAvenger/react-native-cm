import React from 'react';
import {Text} from 'react-native';
import {TextProps} from '../..';

import {styles} from './styles';

export const Illustration: React.FC<TextProps> = ({
  children,
  style,
  numberOfLines,
  onPress,
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={{...styles.default, ...style}}>
      {children}
    </Text>
  );
};
