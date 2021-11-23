import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {PriceAlertItemProps} from '../..';

import {Subtitle} from '../../Typography';
import {styles} from './styles';

export const PriceAlertItem: React.FC<PriceAlertItemProps> = ({
  color,
  metal,
  backgroundColor,
  Image,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{...styles.container, ...style}}>
      <View style={{...styles.image, backgroundColor: backgroundColor}}>
        <Image />
      </View>

      <Subtitle
        style={{marginLeft: 8, color: color, fontFamily: 'OpenSans-Bold'}}>
        {metal}
      </Subtitle>
    </TouchableOpacity>
  );
};
