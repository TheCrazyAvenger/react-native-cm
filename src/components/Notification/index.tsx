import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {NotificationProps} from '..';
import {colors} from '@constants';
import {Description} from '@Typography';
import {styles} from './styles';

export const Notification: React.FC<NotificationProps> = ({
  text,
  visible,
  onPress,
  style,
  textStyle,
  buttonColor,
}) => {
  return visible ? (
    <View style={{...styles.notification, ...style}}>
      <TouchableOpacity style={styles.closeIcon} onPress={onPress}>
        {buttonColor === 'white' ? (
          <Image source={require('@assets/images/register/closeWhite.png')} />
        ) : (
          <Image source={require('@assets/images/register/close.png')} />
        )}
      </TouchableOpacity>
      <Description style={{color: colors.primary, ...textStyle}}>
        {text}
      </Description>
    </View>
  ) : null;
};
