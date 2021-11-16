import React from 'react';
import {View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {CheckBoxProps} from '..';
import {colors} from '../../constants';
import {Description} from '../Typography';
import {styles} from './styles';

export const CheckBoxItem: React.FC<CheckBoxProps> = ({
  value,
  onPress,
  error,
  isTouched,
}) => {
  const errorText = error && isTouched ? colors.red : colors.black;
  const errorCheckBox = error && isTouched ? colors.red : colors.primary;
  return (
    <View style={{flexDirection: 'row'}}>
      <CheckBox
        containerStyle={{padding: 0}}
        checkedColor={colors.primary}
        uncheckedColor={errorCheckBox}
        checked={value}
        onPress={onPress}
      />
      <Description style={{width: '90%', color: errorText}}>
        By creating this account, you agree to our{' '}
        <Description style={styles.agreement}>User Agreement</Description> and{' '}
        <Description style={styles.agreement}>Privacy Policy.</Description>
      </Description>
    </View>
  );
};
