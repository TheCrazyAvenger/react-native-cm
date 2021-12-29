import React from 'react';
import {View} from 'react-native';
import {MaskFormInputProps} from '..';
import {Description, Error} from '@Typography';
import {colors} from '@constants';
import {styles} from './styles';
import MaskInput from 'react-native-mask-input';

export const MaskFormInput: React.FC<MaskFormInputProps> = ({
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
  labelStyle,
  secureTextEntry,
  RightIcon,
  keyboardType = 'default',
  errorStyle,
  maxLength,
  showError = true,
  multiline = false,
  autoFocus = false,
  mask,
}) => {
  const inputContainerStyle = [
    styles.inputContainerStyle,
    containerStyle,
    errorMessage && isTouched ? styles.errorInput : null,
    style,
    {paddingRight: 60},
  ];

  return (
    <View style={{marginBottom: 25}}>
      {label && (
        <Description
          style={{
            ...styles.labelStyle,
            ...labelStyle,
            color: errorMessage && isTouched ? colors.red : colors.gray,
          }}>
          {label}
        </Description>
      )}
      <View>
        <MaskInput
          onTouchStart={onFocus}
          value={value}
          maxLength={maxLength}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          onBlur={onBlur}
          onChange={onChange}
          onTextInput={onInput}
          secureTextEntry={secureTextEntry}
          placeholder={plaseholder}
          mask={mask}
          style={inputContainerStyle}
          onChangeText={onChangeText}
          onContentSizeChange={onContentSizeChange}
          placeholderTextColor={colors.placeholder}
          multiline={multiline}
        />
        {RightIcon && (
          <View style={styles.rightIcon}>
            <RightIcon />
          </View>
        )}
      </View>
      {errorMessage && isTouched && showError && (
        <Error style={{...styles.error, ...errorStyle}}>{errorMessage}</Error>
      )}
    </View>
  );
};
