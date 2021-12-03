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
  disabledStyle,
  disabledTitle,
  titleStyle,
  changeDisabledStyle,
}) => {
  const buttonStyle = [styles.buttonStyle, style, solid ? styles.solid : null];

  const titleStyles = [
    styles.title,
    titleStyle,
    solid ? styles.solidTitle : null,
  ];

  const isDisabledStyle = changeDisabledStyle ? disabledStyle : null;

  return (
    <Button
      containerStyle={styles.container}
      buttonStyle={[...buttonStyle, style]}
      titleStyle={[...titleStyles]}
      type="solid"
      title={disabledTitle ? disabledTitle : title}
      touchSoundDisabled={false}
      onPress={onPress}
      disabled={disabled}
      disabledStyle={{...styles.disable, ...isDisabledStyle}}
      disabledTitleStyle={styles.disableTitle}
    />
  );
};
