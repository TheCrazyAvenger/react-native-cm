import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {DatePickerProps} from '..';
import {Error, Description, SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {colors} from '@constants';
import {Calendar} from '@assets/images/settings';

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  label,
  disabled,
  errorMessage,
  isTouched,
  onConfirm,
  style,
  labelStyle,
  errorStyle,
  showIcon = true,
  type,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const dateStyle = {
    ...styles.date,
    borderColor: disabled ? '#DEDEDE' : colors.placeholder,
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const currentDate =
      type === 'card'
        ? `${
            date.getMonth() < 10
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1
          }/${date.getFullYear()}`
        : date.toLocaleDateString();
    onConfirm(currentDate);
    hideDatePicker();
  };

  return (
    <View style={style}>
      {label && (
        <Description
          style={{
            ...labelStyle,
            ...styles.dateTitle,
            ...(errorMessage && isTouched ? styles.errorLabel : null),
            ...styles.label,
          }}>
          {label}
        </Description>
      )}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TouchableOpacity
        disabled={disabled}
        style={{
          ...dateStyle,
          ...(errorMessage && isTouched ? styles.errorInput : null),
        }}
        activeOpacity={0.7}
        onPress={showDatePicker}>
        <SubtitleMedium
          style={{
            color: disabled
              ? '#DEDEDE'
              : value !== ''
              ? colors.black
              : colors.placeholder,
          }}>
          {value !== '' ? value : 'Your Date'}
        </SubtitleMedium>

        {showIcon && (
          <View style={{marginLeft: 5, opacity: disabled ? 0.4 : 1}}>
            <Calendar />
          </View>
        )}
      </TouchableOpacity>
      {errorMessage && isTouched && (
        <Error style={{...styles.error, ...errorStyle}}>{errorMessage}</Error>
      )}
    </View>
  );
};
