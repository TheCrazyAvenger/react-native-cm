import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {ItemPickerProps} from '..';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constants';
import {Description, SubtitleMedium, Error} from '../Typography';
import {styles} from './styles';

export const ItemPicker: React.FC<ItemPickerProps> = ({
  label,
  style,
  onChange,
  value,
  labelStyle,
  errorStyle,
  errorMessage,
  isTouched,
  items,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <SubtitleMedium style={styles.textItem}>{item.label}</SubtitleMedium>
      </View>
    );
  };

  return (
    <View>
      {label && (
        <Description
          style={{
            ...labelStyle,
            ...(errorMessage && isTouched ? styles.errorLabel : null),
            ...styles.label,
            marginBottom: 6,
            marginHorizontal: 10,
          }}>
          {label}
        </Description>
      )}

      <Dropdown
        style={{
          ...styles.dropdown,
          ...style,
          ...(errorMessage && isTouched ? styles.errorInput : null),
        }}
        placeholderStyle={{
          ...styles.placeholderStyle,
          color: value === '' ? colors.placeholder : colors.black,
        }}
        selectedTextStyle={styles.selectedTextStyle}
        data={items}
        maxHeight={280}
        labelField="label"
        valueField="value"
        placeholder={value !== '' ? value : 'Select one'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onChange(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() =>
          isFocus ? (
            <Image
              source={require('../../assets/images/settings/upIcon.png')}
            />
          ) : (
            <Image
              source={require('../../assets/images/settings/downIcon.png')}
            />
          )
        }
        renderItem={renderItem}
      />
      {errorMessage && isTouched && (
        <Error style={{...styles.error, ...errorStyle}}>{errorMessage}</Error>
      )}
    </View>
  );
};