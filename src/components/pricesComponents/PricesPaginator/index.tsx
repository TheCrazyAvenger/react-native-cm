import React from 'react';
import {View} from 'react-native';
import {PaginatorProps} from '../..';
import {colors} from '../../../constants';
import {styles} from './styles';

export const PricesPaginator: React.FC<PaginatorProps> = ({
  data,
  currentIndex,
}) => {
  return (
    <View style={styles.container}>
      {data.map((_: unknown, i: number) => {
        const stepColor = currentIndex === i ? colors.primary : colors.white;
        return (
          <View style={{...styles.step, backgroundColor: stepColor}} key={i} />
        );
      })}
    </View>
  );
};
