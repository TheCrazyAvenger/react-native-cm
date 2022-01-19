import {ItemPicker, TimePicker, Wrapper} from '@components';
import {colors} from '@constants';
import {getTimeLineDate, timelineData} from '@utilities';
import React, {useMemo, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {VictoryArea, VictoryAxis, VictoryChart} from 'victory-native';
import {styles} from './styles';
//@ts-ignore
import {Stop, LinearGradient, Defs} from 'react-native-svg';

export const TimelineChart: React.FC = ({}) => {
  const {width} = useWindowDimensions();

  const [metalType, setMetalType] = useState('Overall');
  const [chartTime, setTime] = useState(1);

  const data = useMemo(() => {
    return timelineData[metalType][+chartTime].map(
      (item: number, i: number) => {
        const date =
          i % 2 === 0
            ? getTimeLineDate(
                new Date(),
                chartTime === 1
                  ? i
                  : chartTime === 2
                  ? i * 0.7
                  : chartTime === 3
                  ? i * 3.8
                  : chartTime === 4
                  ? i * 45.6
                  : i * 228,
                chartTime === 1 ? 'time' : chartTime === 5 ? 'year' : 'date',
              )
            : new Array(i + 1).join(' ');

        return {x: date, y: item};
      },
    );
  }, [metalType, chartTime]);

  return (
    <View style={{marginBottom: 100}}>
      <ItemPicker
        label="Metal"
        style={{marginBottom: -20}}
        containerStyle={{marginHorizontal: 16}}
        items={[
          {label: 'Overall', value: 'Overall'},
          {label: 'Gold', value: 'Gold'},
          {label: 'Silver', value: 'Silver'},
          {label: 'Platinum', value: 'Platinum'},
          {label: 'Palladium', value: 'Palladium'},
        ]}
        value={metalType}
        onChange={value => setMetalType(value)}
      />

      <VictoryChart
        width={width - 10}
        style={{
          parent: {
            marginLeft: 20,
          },
        }}>
        <Defs>
          <LinearGradient id="gradientStroke" x1="0%" y1="0%" x2="3%" y2="100%">
            <Stop offset="0%" stopColor="#2F80ED" />
            <Stop offset="55%" stopColor="#2F80ED" stopOpacity="0.7" />
            <Stop offset="67%" stopColor="#2F80ED" stopOpacity="0.5" />
            <Stop offset="85%" stopColor="#2F80ED" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#2F80ED" stopOpacity="0.1" />
          </LinearGradient>
        </Defs>
        <VictoryAxis
          dependentAxis
          style={{
            axis: {stroke: colors.white},
            tickLabels: styles.tickLabels,
          }}
          tickFormat={tick => `$${tick}`}
        />
        <VictoryAxis
          style={{
            axis: {stroke: colors.white},
            tickLabels: styles.tickLabels,
          }}
          tickFormat={tick => tick}
        />
        <VictoryArea
          data={data.reverse()}
          style={{
            parent: {paddingLeft: 10},
            data: {fill: 'url(#gradientStroke)'},
          }}
        />
      </VictoryChart>
      <Wrapper style={styles.chartWrapper} />
      <TimePicker chartTime={chartTime} setTime={setTime} />
    </View>
  );
};
