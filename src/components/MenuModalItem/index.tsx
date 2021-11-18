import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {MenuModalItemProps} from '..';
import {Illustration, Subtitle} from '../Typography';

import {styles} from './styles';

export const MenuModalItem: React.FC<MenuModalItemProps> = ({
  uri,
  onPress,
  title,
  text,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image style={styles.image} source={uri} />
      <View>
        <Subtitle style={styles.title}>{title}</Subtitle>
        <Illustration>{text}</Illustration>
      </View>
    </TouchableOpacity>
  );
};
