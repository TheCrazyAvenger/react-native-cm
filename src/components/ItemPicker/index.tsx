import React, {useState} from 'react';
import {Image, Text, View} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {CheckBoxProps, ItemPickerProps} from '..';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../constants';
import {Description, SubtitleMedium} from '../Typography';
import {styles} from './styles';
import RNPickerSelect from 'react-native-picker-select';

export const ItemPicker: React.FC<ItemPickerProps> = ({
  label,
  style,
  onChange,
  value,
  showBorders = true,
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
    <View style={style}>
      {label && (
        <Description
          style={{color: colors.gray, marginBottom: 6, marginHorizontal: 10}}>
          {label}
        </Description>
      )}

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={items}
        maxHeight={280}
        labelField="label"
        valueField="value"
        placeholder={value}
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
    </View>
  );
};
