import {TimePickerProps} from '@components';
import {colors} from '@constants';
import {SubtitleMedium} from '@Typography';
import {time} from '@utilities';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

export const TimePicker: React.FC<TimePickerProps> = ({chartTime, setTime}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {time.map((item, i) => {
        const color = item.id === chartTime ? colors.primary : colors.black;
        const fontFamily =
          item.id === chartTime ? 'OpenSans-SemiBold' : 'OpenSans-Regular';
        return (
          <TouchableOpacity
            key={i}
            style={{marginHorizontal: 12}}
            activeOpacity={0.7}
            onPress={() => setTime(item.id)}>
            <SubtitleMedium style={{color, fontFamily}}>
              {item.time}
            </SubtitleMedium>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
