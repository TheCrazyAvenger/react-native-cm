import React from 'react';
import {View} from 'react-native';
import {Input} from 'react-native-elements';
import {FormInputProps} from '..';
import {Error} from '../Typography/Error';
import {colors} from '../../constants';
import {styles} from './styles';

export const FormInput: React.FC<FormInputProps> = ({
  label,
  plaseholder,
  onChangeText,
  onFocus,
  value,
  errorMessage,
  isTouched,
  style,
  secureTextEntry,
  rightIcon,
  onInput,
}) => {
  const inputContainerStyle = [
    styles.inputContainerStyle,
    errorMessage && isTouched ? styles.errorInput : null,
  ];
  const labelStyle = [
    styles.labelStyle,
    errorMessage && isTouched ? styles.errorLabel : null,
  ];

  return (
    <View>
      <Input
        rightIcon={rightIcon}
        onTouchStart={onFocus}
        value={value}
        label={label}
        onTextInput={onInput}
        secureTextEntry={secureTextEntry}
        placeholder={plaseholder}
        onChangeText={onChangeText}
        placeholderTextColor={colors.placeholder}
        inputStyle={styles.inputStyle}
        labelStyle={[...labelStyle, style]}
        inputContainerStyle={[...inputContainerStyle]}
      />
      {errorMessage && isTouched && (
        <Error style={styles.error}>{errorMessage}</Error>
      )}
    </View>
  );
};
