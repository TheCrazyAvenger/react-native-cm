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
  onChange,
  onInput,
  onContentSizeChange,
  value,
  errorMessage,
  isTouched,
  style,
  containerStyle,
  secureTextEntry,
  rightIcon,
  leftIcon,
  height,
  disabled,
  leftPrefix,
  inputStyle,
  keyboardType = 'default',
  errorStyle,
  maxLength,
  showError = true,
  multiline = false,
  autoFocus = false,
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
          maxLength={maxLength}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          onBlur={onBlur}
          onChange={onChange}
          onTextInput={onInput}
          secureTextEntry={secureTextEntry}
          placeholder={plaseholder}
          leftIcon={leftIcon}
          onChangeText={onChangeText}
          onContentSizeChange={onContentSizeChange}
          placeholderTextColor={colors.placeholder}
          inputStyle={{...styles.inputStyle, ...inputStyle}}
          labelStyle={[...labelStyle, style]}
          multiline={multiline}
          inputContainerStyle={[
            ...inputContainerStyle,
            {paddingLeft: leftPrefix ? 15 : 10, height: height ? height : 45},
          ]}
          disabled={disabled ? true : false}
        />
        {leftPrefix && (
          <SubtitleMedium
            style={{
              ...styles.leftPrefix,
              color: value === '' ? colors.placeholder : colors.black,
              top: label ? 36 : 11,
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
