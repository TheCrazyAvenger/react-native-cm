import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {DatePickerProps} from '..';
import {Error} from '../Typography/Error';
import {styles} from './styles';
import {Description, SubtitleMedium} from '../Typography';
import {colors} from '../../constants';

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  label,
  disabled,
  errorMessage,
  isTouched,
  onConfirm,
  style,
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
    onConfirm(date.toLocaleDateString());
    hideDatePicker();
  };

  return (
    <View style={style}>
      {label && <Description style={styles.dateTitle}>{label}</Description>}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TouchableOpacity
        disabled={disabled}
        style={dateStyle}
        activeOpacity={0.7}
        onPress={showDatePicker}>
        <SubtitleMedium style={{color: disabled ? '#DEDEDE' : colors.black}}>
          {value}
        </SubtitleMedium>
        <Image
          style={{marginLeft: 5, opacity: disabled ? 0.4 : 1}}
          source={require('../../assets/images/settings/calendar.png')}
        />
      </TouchableOpacity>
      {errorMessage && isTouched && (
        <Error style={styles.error}>{errorMessage}</Error>
      )}
    </View>
  );
};
