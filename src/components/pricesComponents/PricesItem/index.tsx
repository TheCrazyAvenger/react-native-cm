import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {PricesChart, PricesItemProps, Wrapper} from '../..';
import {colors} from '@constants';
import {Description, Subtitle} from '@Typography';
import {styles} from './styles';
import {getMetalsColor, numberWithCommas} from '@utilities';

export const PricesItem: React.FC<PricesItemProps> = ({data}) => {
  const {name, buy, id, digitalMetal} = data;
  const {oneDayChange, oneDayPercentChange} = digitalMetal;
  const {width} = useWindowDimensions();
  return (
    <View style={{...styles.container, width: width - 55}}>
      <View style={styles.header}>
        <Subtitle style={{...styles.cardTitle, color: getMetalsColor(id)}}>
          {name}
        </Subtitle>
        <Subtitle style={styles.cardTitle}>{`$${numberWithCommas(
          Number(buy).toFixed(2),
        )}`}</Subtitle>
      </View>
      <Wrapper style={{marginVertical: 8, backgroundColor: colors.lightGray}} />
      <View style={styles.cardItem}>
        <View>
          <Description style={styles.itemTitle}>Change (%):</Description>
          <Description>
            {numberWithCommas(Number(oneDayPercentChange).toFixed(2))}%
          </Description>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Description style={styles.itemTitle}>Change ($):</Description>
          <Description>{`$${numberWithCommas(
            Number(oneDayChange).toFixed(2),
          )}`}</Description>
        </View>
      </View>
      <Wrapper style={{marginTop: 8}} />
      <PricesChart lineColor={getMetalsColor(id)} chartMetal={id} />
    </View>
  );
};
