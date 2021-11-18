import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MetalPickerProps} from '../..';
import {metals} from '../../../utilities';
import {SubtitleMedium} from '../../Typography';
import {styles} from './styles';

export const MetalPicker: React.FC<MetalPickerProps> = ({
  currentMetal,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      {metals.map((item, i) => {
        const isMarked = i + 1 === currentMetal ? styles.marked : null;
        return (
          <TouchableOpacity key={i} onPress={() => onPress(item.id)}>
            <View>
              <SubtitleMedium style={styles.title}>{item.metal}</SubtitleMedium>
            </View>
            {isMarked && <View style={styles.marked} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
