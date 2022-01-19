import {ItemPicker, LoadingItem, TimePicker, Wrapper} from '@components';
import {colors} from '@constants';
import React, {useEffect, useMemo, useState} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {VictoryArea, VictoryAxis, VictoryChart} from 'victory-native';
import {styles} from './styles';
//@ts-ignore
import {Stop, LinearGradient, Defs} from 'react-native-svg';
import {useUpdateChartsDataMutation} from '@api';
import {getTimeLineDate, getTimePicker} from '@utilities';

export const TimelineChart: React.FC = ({}) => {
  const {width} = useWindowDimensions();

  const [metalType, setMetalType] = useState('0');
  const [chartTime, setTime] = useState(1);

  const [updateChartsData, {data, isLoading}] = useUpdateChartsDataMutation();

  useEffect(() => {
    updateChartsData({type: getTimePicker(chartTime)});
  }, [chartTime]);

  const chartData = useMemo(() => {
    if (data) {
      const dataArray =
        metalType === '0' ? data.data['1'] : data.data[metalType];

      return dataArray.map((item: any) => {
        const date = new Date(item.time * 1000);

        return {
          x: date,
          y: +item.value,
        };
      });
    }
  }, [metalType, chartTime, data]);

  const minDomain = useMemo(() => {
    if (chartData) {
      return Math.min(...chartData.map((item: any) => item.y)) - 1;
    }
  }, [chartData]);

  return (
    <View style={{marginBottom: 100}}>
      <ItemPicker
        label="Metal"
        style={{marginBottom: isLoading ? 0 : -20}}
        containerStyle={{marginHorizontal: 16}}
        items={[
          {label: 'Overall', value: '0'},
          {label: 'Gold', value: '1'},
          {label: 'Silver', value: '2'},
          {label: 'Platinum', value: '3'},
          {label: 'Palladium', value: '4'},
        ]}
        value={metalType}
        onChange={value => setMetalType(value)}
      />

      {isLoading ? (
        <View style={{height: 280}}>
          <LoadingItem />
        </View>
      ) : (
        <VictoryChart
          minDomain={{y: minDomain}}
          width={width - 10}
          style={{
            parent: {
              marginLeft: 20,
            },
          }}>
          <Defs>
            <LinearGradient
              id="gradientStroke"
              x1="0%"
              y1="0%"
              x2="3%"
              y2="100%">
              <Stop offset="0%" stopColor="#2F80ED" />
              <Stop offset="55%" stopColor="#2F80ED" stopOpacity="0.7" />
              <Stop offset="67%" stopColor="#2F80ED" stopOpacity="0.5" />
              <Stop offset="85%" stopColor="#2F80ED" stopOpacity="0.3" />
              <Stop offset="100%" stopColor="#2F80ED" stopOpacity="0.1" />
            </LinearGradient>
          </Defs>
          <VictoryAxis
            dependentAxis
            tickCount={6}
            fixLabelOverlap
            style={{
              axis: {stroke: colors.white},
              tickLabels: styles.tickLabels,
            }}
            tickFormat={tick => `$${tick}`}
          />
          <VictoryAxis
            fixLabelOverlap
            style={{
              axis: {stroke: colors.white},
              tickLabels: styles.tickLabels,
            }}
            tickFormat={tick => getTimeLineDate(chartTime, tick)}
          />
          <VictoryArea
            data={chartData}
            style={{
              parent: {paddingLeft: 10},
              data: {fill: 'url(#gradientStroke)'},
            }}
          />
        </VictoryChart>
      )}
      <Wrapper style={styles.chartWrapper} />
      <TimePicker chartTime={chartTime} setTime={setTime} />
    </View>
  );
};
