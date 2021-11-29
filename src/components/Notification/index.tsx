import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {NotificationProps} from '..';
import {colors} from '../../constants';
import {Description} from '../Typography';
import {styles} from './styles';

export const Notification: React.FC<NotificationProps> = ({
  text,
  visible,
  onPress,
  style,
}) => {
  return visible ? (
    <View style={{...styles.notification, ...style}}>
      <TouchableOpacity style={styles.closeIcon} onPress={onPress}>
        <Image source={require('../../assets/images/register/close.png')} />
      </TouchableOpacity>
      <Description style={{color: colors.primary}}>{text}</Description>
    </View>
  ) : null;
};
