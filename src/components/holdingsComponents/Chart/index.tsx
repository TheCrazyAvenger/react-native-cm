import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {LineChart, Path} from 'react-native-svg-charts';
import {ChartProps, Wrapper} from '../..';
import {colors} from '@constants';
import {time} from '@utilities';
import {SubtitleMedium} from '@Typography';

//@ts-ignore
const Shadow: React.FC = ({line, lineColor}: {line: any; lineColor: any}) => (
  <Path
    key={'shadow'}
    //@ts-ignore
    y={10}
    //@ts-ignore
    d={line}
    strokeOpacity={0.2}
    fill={'none'}
    strokeWidth={15}
    stroke={lineColor}
  />
);

export const Chart: React.FC<ChartProps> = ({
  chartTime,
  setTime,
  lineColor,
}) => {
  const data = [
    [10, 10, 4, 91, 35, 53, -53, 24, 50, -20, 10],
    [10, 10, 40, 95, -4, -24, 5, 45, 50, -20, 10],
    [85, 91, 35, 53, -53, 24, 50, -20, 43, 54, 10],
    [5, 53, -53, 24, 50, 43, -20, 10],
    [10, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, 0, 10, 40, 95],
  ];

  return (
    <View>
      <LineChart
        style={{height: 200}}
        data={data[chartTime - 1]}
        svg={{stroke: lineColor}}
        contentInset={{top: 60, bottom: 40}}
        animate>
        {/* 
        // @ts-ignore */}
        <Shadow lineColor={lineColor} />
      </LineChart>
      <Wrapper style={{backgroundColor: colors.paleBlue, marginTop: 8}} />
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
    </View>
  );
};
