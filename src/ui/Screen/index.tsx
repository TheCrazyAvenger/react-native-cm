import React from 'react';
import {ScrollView, View} from 'react-native';
import {ScreenProps} from '..';
import {styles} from './styles';

export const Screen: React.FC<ScreenProps> = ({children, type, style}) => {
  return type === 'View' ? (
    <View style={{...styles.container, ...style}}>{children}</View>
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{...styles.container, ...style}}>
      {children}
    </ScrollView>
  );
};
