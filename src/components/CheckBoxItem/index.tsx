import React from 'react';
import {TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {CheckBoxProps} from '..';
import {colors} from '@constants';

export const CheckBoxItem: React.FC<CheckBoxProps> = ({
  value,
  onPress,
  error,
  isTouched,
  children,
  style,
  containerStyle,
}) => {
  const errorCheckBox = error && isTouched ? colors.red : colors.primary;
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        ...containerStyle,
      }}
      activeOpacity={1}
      onPress={onPress}>
      <CheckBox
        containerStyle={{padding: 0, ...style}}
        checkedColor={colors.primary}
        uncheckedColor={errorCheckBox}
        checked={value}
        onPress={onPress}
      />
      {children}
    </TouchableOpacity>
  );
};
