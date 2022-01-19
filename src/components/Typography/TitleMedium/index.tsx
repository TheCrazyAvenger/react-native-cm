import React, {useState} from 'react';
import {Text} from 'react-native';
import {TextProps} from '../..';

import {styles} from './styles';

export const TitleMedium: React.FC<TextProps> = ({
  children,
  style,
  numberOfLines,
  onPress,
}) => {
  const [currentFont, setCurrentFont] = useState(24);
  return (
    <Text
      adjustsFontSizeToFit
      numberOfLines={numberOfLines}
      onPress={onPress}
      style={{...styles.default, ...style, fontSize: currentFont}}
      onTextLayout={e => {
        const {lines} = e.nativeEvent;
        if (numberOfLines && lines.length > numberOfLines) {
          setCurrentFont(currentFont - 1);
        }
      }}>
      {children}
    </Text>
  );
};
