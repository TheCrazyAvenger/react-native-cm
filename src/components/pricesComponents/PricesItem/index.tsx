import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {PricesChart, PricesItemProps, Wrapper} from '../..';
import {colors} from '../../../constants';
import {Description, Subtitle, SubtitleMedium} from '../../Typography';
import {styles} from './styles';

export const PricesItem: React.FC<PricesItemProps> = ({data}) => {
  const {metal, price, ounceChange, usdChange, color, id} = data;
  const {width} = useWindowDimensions();
  return (
    <View style={{...styles.container, width: width - 55}}>
      <View style={styles.header}>
        <Subtitle style={{...styles.cardTitle, color: color}}>{metal}</Subtitle>
        <Subtitle style={styles.cardTitle}>{price}</Subtitle>
      </View>
      <Wrapper style={{marginVertical: 8, backgroundColor: colors.lightGray}} />
      <View style={styles.cardItem}>
        <View>
          <Description style={styles.itemTitle}>Change (%):</Description>
          <Description>{ounceChange}</Description>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Description style={styles.itemTitle}>Change ($):</Description>
          <Description>{usdChange}</Description>
        </View>
      </View>
      <Wrapper style={{marginTop: 8}} />
      <PricesChart lineColor={color} chartMetal={id} />
    </View>
  );
};
