import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MetalPickerProps} from '../..';
import {colors} from '@constants';
import {metals} from '@utilities';
import {SubtitleMedium} from '@Typography';
import {styles} from './styles';

export const MetalPicker: React.FC<MetalPickerProps> = ({
  currentMetal,
  onPress,
  colorfull = false,
  markedColor,
  showAll = false,
}) => {
  const allMetals = showAll
    ? [{metal: 'All', id: 0, color: 'black'}, ...metals]
    : metals;

  return (
    <View style={styles.container}>
      {allMetals.map((item, i) => {
        const index = showAll === true ? i : i + 1;
        const isMarked = index === currentMetal ? styles.marked : null;
        const isColorfull = !colorfull
          ? colors.white
          : isMarked
          ? markedColor
            ? markedColor
            : item.color
          : colors.black;

        return (
          <TouchableOpacity key={i} onPress={() => onPress(item.id)}>
            <View>
              <SubtitleMedium
                style={{
                  ...styles.title,
                  color: isColorfull,
                }}>
                {item.metal}
              </SubtitleMedium>
            </View>
            {isMarked && (
              <View
                style={{
                  ...styles.marked,
                  backgroundColor: isColorfull,
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
