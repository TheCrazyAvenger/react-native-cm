import React from 'react';
import {TouchableOpacity} from 'react-native';
import {MenuItemSmallProps, Wrapper} from '../..';
import {colors} from '@constants';
import {SubtitleMedium} from '@Typography';
import {styles} from './styles';

export const MenuItemSmall: React.FC<MenuItemSmallProps> = ({
  title,
  textColor,
  onPress,
  style,
}) => {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={{...styles.container}}>
        <SubtitleMedium style={{color: textColor ? textColor : colors.gray}}>
          {title}
        </SubtitleMedium>
      </TouchableOpacity>
      <Wrapper style={{...styles.wrapper, ...style}} />
    </>
  );
};
