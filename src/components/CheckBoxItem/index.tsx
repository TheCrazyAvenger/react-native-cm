import React from 'react';
import {View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {CheckBoxProps} from '..';
import {colors} from '../../constants';

export const CheckBoxItem: React.FC<CheckBoxProps> = ({
  value,
  onPress,
  error,
  isTouched,
  children,
  style,
}) => {
  const errorCheckBox = error && isTouched ? colors.red : colors.primary;
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
      <CheckBox
        containerStyle={{padding: 0, ...style}}
        checkedColor={colors.primary}
        uncheckedColor={errorCheckBox}
        checked={value}
        onPress={onPress}
      />
      {children}
    </View>
  );
};
