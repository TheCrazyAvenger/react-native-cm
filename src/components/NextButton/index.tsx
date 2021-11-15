import React from 'react';
import {Button} from 'react-native-elements';
import {NextButtonProps} from '..';
import {styles} from './styles';

export const NextButton: React.FC<NextButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  return (
    <Button
      containerStyle={styles.container}
      buttonStyle={{...styles.buttonStyle, ...style}}
      titleStyle={styles.title}
      type="solid"
      title={title}
      onPress={onPress}
    />
  );
};
