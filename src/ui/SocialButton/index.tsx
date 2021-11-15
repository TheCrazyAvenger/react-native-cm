import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {Image} from 'react-native-elements/dist/image/Image';
import {SocialButtonProps} from '..';
import {styles} from './styles';

export const SocialButton: React.FC<SocialButtonProps> = ({
  imageUri,
  onPress,
  style,
  borderColor,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, style, {borderColor: borderColor}]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Image style={{width: 107, height: 20}} source={imageUri} />
    </TouchableOpacity>
  );
};
