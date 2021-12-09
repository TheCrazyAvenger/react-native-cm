import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {colors} from '@constants';
import {SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {OperationsPickerProps} from 'src/components/PropTypes';
import {Wrapper} from '@components';

export const OperationsPicker: React.FC<OperationsPickerProps> = ({
  currentOperation,
  onPress,
}) => {
  const allOperations = [
    {metal: 'All', id: 0, color: 'black'},
    {metal: 'Buys', id: 1, color: 'black'},
    {metal: 'Sells', id: 2, color: 'black'},
    {metal: 'Deposits', id: 3, color: 'black'},
    {metal: 'Withdrawals', id: 4, color: 'black'},
    {metal: 'Redemptions', id: 5, color: 'black'},
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={{paddingHorizontal: 6}}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {allOperations.map((item, i) => {
          const isMarked = i === currentOperation ? styles.marked : null;
          const color = isMarked ? colors.primary : colors.black;

          return (
            <TouchableOpacity
              style={{marginRight: 15}}
              key={i}
              onPress={() => onPress(item.id)}>
              <View>
                <SubtitleMedium
                  style={{
                    ...styles.title,
                    color,
                  }}>
                  {item.metal}
                </SubtitleMedium>
              </View>
              {isMarked && (
                <View
                  style={{
                    ...styles.marked,
                    backgroundColor: color,
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <Wrapper
        style={{backgroundColor: colors.primary, marginTop: 0, marginBottom: 0}}
      />
    </View>
  );
};
