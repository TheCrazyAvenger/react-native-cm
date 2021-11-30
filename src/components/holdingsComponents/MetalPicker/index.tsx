import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MetalPickerProps} from '../..';
import {colors} from '../../../constants';
import {metals} from '../../../utilities';
import {SubtitleMedium} from '../../Typography';
import {styles} from './styles';

export const MetalPicker: React.FC<MetalPickerProps> = ({
  currentMetal,
  onPress,
  colorfull = false,
}) => {
  return (
    <View style={styles.container}>
      {metals.map((item, i) => {
        const isMarked = i + 1 === currentMetal ? styles.marked : null;
        const isColorfull = !colorfull
          ? colors.white
          : isMarked
          ? item.color
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
