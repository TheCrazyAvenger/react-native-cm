import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Switch} from 'react-native-elements';
import {MenuItemProps} from '../..';
import {colors} from '../../../constants';
import {Illustration, SubtitleMedium} from '../../Typography';
import {styles} from './styles';

export const MenuItem: React.FC<MenuItemProps> = ({
  title,
  description,
  Image,
  onPress,
  style,
  type,
  switchValue,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{...styles.container, ...style}}>
      <View style={styles.content}>
        <Image />
        <View style={{width: type ? '76%' : '85%'}}>
          <SubtitleMedium style={styles.title}>{title}</SubtitleMedium>
          <Illustration>{description}</Illustration>
        </View>
      </View>
      {type && (
        <Switch
          value={switchValue}
          color={colors.primary}
          onValueChange={onPress}
        />
      )}
    </TouchableOpacity>
  );
};
