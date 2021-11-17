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
}) => {
  return visible ? (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.notification}>
        <Image
          style={styles.closeIcon}
          source={require('../../assets/images/register/close.png')}
        />

        <Description style={{color: colors.primary}}>{text}</Description>
      </View>
    </TouchableOpacity>
  ) : null;
};
