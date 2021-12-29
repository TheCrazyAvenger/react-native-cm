import React, {useMemo} from 'react';
import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {ChartProps, Wrapper} from '../..';
import {colors, Screens} from '@constants';
import {getMetal, time, timelineData} from '@utilities';
import {SubtitleMedium} from '@Typography';
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

export const Chart: React.FC<ChartProps> = ({
  chartTime,
  setTime,
  lineColor,
  metalType,
  metalsData,
}) => {
  const navigation: any = useNavigation();
  const {width} = useWindowDimensions();

  const data = useMemo(() => {
    return timelineData[getMetal(metalType)][+chartTime].map(
      (item: number, i: number) => ({x: i, y: item}),
    );
  }, [chartTime, metalType]);

  return (
    <View>
      <View style={{marginLeft: -50}}>
        <VictoryChart
          width={width}
          height={170}
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
            data={data}
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
                <Stop offset="10%" stopColor={lineColor} stopOpacity="0.3" />
                <Stop offset="80%" stopColor={lineColor} stopOpacity="0" />
                <Stop offset="100%" stopColor={lineColor} stopOpacity="0" />
              </LinearGradient>
            </Defs>

            <VictoryArea />
          </VictoryGroup>
        </VictoryChart>
      </View>
      <Wrapper style={{backgroundColor: colors.paleBlue, marginTop: -26}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {time.map((item, i) => {
          const color = item.id === chartTime ? colors.primary : colors.black;
          const fontFamily =
            item.id === chartTime ? 'OpenSans-SemiBold' : 'OpenSans-Regular';
          return (
            <TouchableOpacity
              key={i}
              style={{marginHorizontal: 12}}
              activeOpacity={0.7}
              onPress={() => setTime(item.id)}>
              <SubtitleMedium style={{color, fontFamily}}>
                {item.time}
              </SubtitleMedium>
            </TouchableOpacity>
          );
        })}
      </View>
      {metalsData && (
        <View style={styles.buttons}>
          <View style={{width: '47%'}}>
            <TextButton
              title="Sell"
              onPress={() =>
                navigation.navigate(Screens.sellBuySetup, {
                  data: metalsData,
                  type: 'Sell',
                })
              }
            />
          </View>
          <View style={{width: '47%'}}>
            <TextButton
              title="Buy"
              solid
              onPress={() =>
                navigation.navigate(Screens.sellBuySetup, {
                  data: metalsData,
                  type: 'Buy',
                })
              }
            />
          </View>
        </View>
      )}
    </View>
  );
};
