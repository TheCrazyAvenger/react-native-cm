import React from 'react';
import {Button} from 'react-native-elements';
import {TextButtonProps} from '..';
import {styles} from './styles';

export const TextButton: React.FC<TextButtonProps> = ({
  title,
  solid = false,
  onPress,
  style,
  disabled,
}) => {
  const buttonStyle = [styles.buttonStyle, style, solid ? styles.solid : null];

  const titleStyle = [styles.title, solid ? styles.solidTitle : null];

  return (
    <Button
      containerStyle={styles.container}
      buttonStyle={[...buttonStyle, style]}
      titleStyle={[...titleStyle]}
      type="solid"
      title={title}
      touchSoundDisabled={false}
      onPress={onPress}
      disabled={disabled}
      disabledStyle={styles.disable}
      disabledTitleStyle={styles.disableTitle}
    />
  );
};
