import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {TextProps} from 'react-native-elements';
import {ViewMoreButtonProps} from '..';
import {SubtitleMedium} from '../Typography';
import {styles} from './styles';

export const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.button, ...style}}>
      <SubtitleMedium style={styles.buttonText}>View More</SubtitleMedium>
      <Image
        style={{marginLeft: 12}}
        source={require('../../assets/images/home/viewMore.png')}
      />
    </TouchableOpacity>
  );
};
