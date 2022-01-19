import React, {useEffect, useMemo} from 'react';
import {useWindowDimensions, View} from 'react-native';
import {ChartProps, LoadingItem, TimePicker, Wrapper} from '../..';
import {colors, Screens} from '@constants';
import {getTimePicker} from '@utilities';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
} from 'victory-native';
//@ts-ignore
import {Stop, LinearGradient, Defs} from 'react-native-svg';
import {TextButton} from '@ui';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {useUpdateChartsDataMutation} from '@api';

export const Chart: React.FC<ChartProps> = ({
  chartTime,
  setTime,
  lineColor,
  metalType,
  metalsData,
}) => {
  const navigation: any = useNavigation();
  const {width} = useWindowDimensions();

  const [updateChartsData, {data, isLoading}] = useUpdateChartsDataMutation();

  useEffect(() => {
    updateChartsData({type: getTimePicker(chartTime)});
  }, [chartTime]);

  const handleSellBuy = (type: string) => {
    navigation.navigate(Screens.sellBuySetup, {
      data: metalsData,
      type,
    });
  };

  const chartData = useMemo(() => {
    if (data) {
      return data.data[metalType].map((item: any, i: number) => ({
        x: i,
        y: +item.value,
      }));
    }
  }, [data, chartTime, metalType]);

  const minDomain = useMemo(() => {
    if (chartData) {
      return Math.min(...chartData.map((item: any) => item.y)) - 1;
    }
  }, [chartData]);

  return (
    <View>
      <View style={{marginLeft: isLoading ? 0 : -50}}>
        {isLoading ? (
          <View style={{height: 180}}>
            <LoadingItem />
          </View>
        ) : (
          <VictoryChart
            width={width}
            minDomain={{y: minDomain}}
            height={180}
            style={{parent: {marginBottom: 0}}}>
            <VictoryAxis
              style={{
                axis: {stroke: colors.white},
              }}
              dependentAxis
              tickFormat={() => ''}
            />
            <VictoryAxis
              style={{
                axis: {stroke: colors.white},
              }}
              tickFormat={() => ''}
            />
            <VictoryGroup
              data={chartData}
              style={{
                parent: {paddingLeft: 10},
                data: {
                  fill: 'url(#gradientStroke)',
                  stroke: lineColor,
                  strokeWidth: 2,
                },
              }}>
              <Defs>
                <LinearGradient
                  id="gradientStroke"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%">
                  <Stop offset="0%" stopColor={lineColor} stopOpacity="0.4" />
                  <Stop offset="3%" stopColor={lineColor} stopOpacity="0.3" />
                  <Stop offset="50%" stopColor={lineColor} stopOpacity="0" />
                  <Stop offset="80%" stopColor={lineColor} stopOpacity="0" />
                  <Stop offset="100%" stopColor={lineColor} stopOpacity="0" />
                </LinearGradient>
              </Defs>

              <VictoryArea />
            </VictoryGroup>
          </VictoryChart>
        )}
      </View>
      <Wrapper style={{backgroundColor: colors.paleBlue, marginTop: -26}} />
      <TimePicker chartTime={chartTime} setTime={setTime} />

      {metalsData && (
        <View style={styles.buttons}>
          <View style={{width: '47%'}}>
            <TextButton title="Sell" onPress={() => handleSellBuy('Sell')} />
          </View>
          <View style={{width: '47%'}}>
            <TextButton
              title="Buy"
              solid
              onPress={() => handleSellBuy('Buy')}
            />
          </View>
        </View>
      )}
    </View>
  );
};
