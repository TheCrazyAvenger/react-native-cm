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
  onBlur,
  value,
  errorMessage,
  isTouched,
  style,
  containerStyle,
  secureTextEntry,
  rightIcon,
  onInput,
  disabled,
}) => {
  const inputContainerStyle = [
    styles.inputContainerStyle,
    containerStyle,
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
        onBlur={onBlur}
        onTextInput={onInput}
        secureTextEntry={secureTextEntry}
        placeholder={plaseholder}
        onChangeText={onChangeText}
        placeholderTextColor={colors.placeholder}
        inputStyle={styles.inputStyle}
        labelStyle={[...labelStyle, style]}
        inputContainerStyle={[...inputContainerStyle]}
        disabled={disabled ? true : false}
      />
      {errorMessage && isTouched && (
        <Error style={styles.error}>{errorMessage}</Error>
      )}
    </View>
  );
};
