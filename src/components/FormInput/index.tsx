import React from 'react';
import {Text, View} from 'react-native';
import {Input} from 'react-native-elements';
import {FormInputProps} from '..';
import {Error, SubtitleMedium} from '@Typography';
import {colors} from '@constants';
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
  leftIcon,
  onInput,
  disabled,
  leftPrefix,
  inputStyle,
  keyboardType = 'default',
  errorStyle,
  showError = true,
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
      <View>
        <Input
          rightIcon={rightIcon}
          onTouchStart={onFocus}
          value={value}
          label={label}
          keyboardType={keyboardType}
          onBlur={onBlur}
          onTextInput={onInput}
          secureTextEntry={secureTextEntry}
          placeholder={plaseholder}
          leftIcon={leftIcon}
          onChangeText={onChangeText}
          placeholderTextColor={colors.placeholder}
          inputStyle={{...styles.inputStyle, ...inputStyle}}
          labelStyle={[...labelStyle, style]}
          inputContainerStyle={[
            ...inputContainerStyle,
            {paddingLeft: leftPrefix ? 15 : 10},
          ]}
          disabled={disabled ? true : false}
        />
        {leftPrefix && (
          <SubtitleMedium
            style={{
              ...styles.leftPrefix,
              color: value === '' ? colors.placeholder : colors.black,
            }}>
            {leftPrefix}
          </SubtitleMedium>
        )}
      </View>
      {errorMessage && isTouched && showError && (
        <Error style={{...styles.error, ...errorStyle}}>{errorMessage}</Error>
      )}
    </View>
  );
};
