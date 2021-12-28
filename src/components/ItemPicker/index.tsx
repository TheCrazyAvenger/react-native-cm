import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {ItemPickerProps} from '..';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '@constants';
import {Description, SubtitleMedium, Error} from '@Typography';
import {styles} from './styles';

export const ItemPicker: React.FC<ItemPickerProps> = ({
  label,
  style,
  onChange,
  value,
  labelStyle,
  errorStyle,
  errorMessage,
  containerStyle,
  placeholderStyle,
  isTouched,
  disabled,
  items,
  textStyle,
  showArrow = true,
  LeftIcon,
  maxHeight,
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
    <View style={containerStyle}>
      {label && (
        <Description
          style={{
            ...labelStyle,
            color: errorMessage && isTouched ? colors.red : colors.gray,
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
          ...placeholderStyle,
          color: value === '' ? colors.placeholder : colors.black,
        }}
        selectedTextStyle={{
          ...styles.selectedTextStyle,
          ...textStyle,
          color: disabled ? colors.placeholder : colors.black,
        }}
        data={items}
        maxHeight={maxHeight ? maxHeight : 280}
        disable={disabled}
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
        renderLeftIcon={() =>
          LeftIcon ? (
            <View style={{marginRight: 8}}>
              <LeftIcon />
            </View>
          ) : null
        }
        renderRightIcon={() =>
          !showArrow ? null : isFocus ? (
            <Image source={require('@assets/images/settings/upIcon.png')} />
          ) : (
            <Image source={require('@assets/images/settings/downIcon.png')} />
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
