import React, {useState} from 'react';
import {View} from 'react-native';
import {Wrapper} from '../..';
import {colors} from '@constants';
import {getColor, metals, numberWithCommas} from '@utilities';
import {Illustration, SubtitleMedium, TitleMedium} from '@Typography';
import {Chart} from '../Chart';
import {styles} from './styles';

export const PriceGraph: React.FC<{id: number; data: any; metalType: number}> =
  ({data, id, metalType}) => {
    const {buy, digitalMetal} = data[id];
    const {oneDayChange, oneDayPercentChange} = digitalMetal;
    const [chartTime, setChartTime] = useState(1);
    const lineColor = metals[id].color;

    return (
      <View style={styles.container}>
        <TitleMedium style={styles.cardTitle}>Spot Prices</TitleMedium>

        <View>
          <SubtitleMedium
            style={styles.price}>{`Current Price: $${numberWithCommas(
            Number(buy).toFixed(2),
          )}`}</SubtitleMedium>
          <View style={styles.cardItem}>
            <Illustration style={{color: colors.black, marginRight: 18}}>
              Change (%):{' '}
              <Illustration style={{color: getColor(oneDayPercentChange)}}>
                {`${numberWithCommas(
                  Number(Math.abs(oneDayPercentChange)).toFixed(2),
                )}%`}
              </Illustration>
            </Illustration>
            <Illustration style={{color: colors.black, marginRight: 18}}>
              Change ($):{' '}
              <Illustration style={{color: getColor(oneDayChange)}}>
                {`$${numberWithCommas(
                  Number(Math.abs(oneDayChange)).toFixed(2),
                )}`}
              </Illustration>
            </Illustration>
          </View>
          <Wrapper
            style={{
              backgroundColor: colors.paleBlue,
              marginTop: 8,
              marginBottom: 60,
            }}
          />
          <Chart
            metalType={metalType}
            lineColor={lineColor}
            chartTime={chartTime}
            setTime={setChartTime}
          />
        </View>
      </View>
    );
  };
