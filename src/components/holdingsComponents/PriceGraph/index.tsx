import React, {useState} from 'react';
import {View} from 'react-native';
import {Wrapper} from '../..';
import {colors} from '@constants';
import {getColor, metals} from '@utilities';
import {Illustration, SubtitleMedium, TitleMedium} from '@Typography';
import {Chart} from '../Chart';
import {styles} from './styles';

export const PriceGraph: React.FC<{id: number}> = ({id}) => {
  const {price, ounceChange, usdChange} = metals[id - 1];
  const [chartTime, setChartTime] = useState(1);
  const lineColor = metals[id - 1].color;

  const setTime = (i: number) => {
    setChartTime(i);
  };

  return (
    <View style={styles.container}>
      <TitleMedium style={styles.cardTitle}>Spot Prices</TitleMedium>

      <View>
        <SubtitleMedium
          style={styles.price}>{`Current Price: ${price}`}</SubtitleMedium>
        <View style={styles.cardItem}>
          <Illustration style={{color: colors.black, marginRight: 18}}>
            Change (%):{' '}
            <Illustration style={{color: getColor(ounceChange)}}>
              {ounceChange}
            </Illustration>
          </Illustration>
          <Illustration style={{color: colors.black, marginRight: 18}}>
            Change ($):{' '}
            <Illustration style={{color: getColor(usdChange)}}>
              {usdChange}
            </Illustration>
          </Illustration>
        </View>
        <Wrapper style={{backgroundColor: colors.paleBlue, marginTop: 8}} />
        <Chart lineColor={lineColor} chartTime={chartTime} setTime={setTime} />
      </View>
    </View>
  );
};
