import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {LineChart, Grid, Path} from 'react-native-svg-charts';
import {ChartProps, Wrapper} from '../..';
import {colors} from '../../../constants';
import {time} from '../../../utilities';
import {Subtitle, SubtitleMedium} from '../../Typography';

//@ts-ignore
const Shadow: React.FC = ({line}: {line: any}) => (
  <Path
    key={'shadow'}
    y={10}
    //@ts-ignore
    d={line}
    fill={'none'}
    strokeWidth={15}
    stroke={'rgba(255, 191, 0, 0.2)'}
  />
);

export const Chart: React.FC<ChartProps> = ({chartTime, setTime}) => {
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
        svg={{stroke: '#FFBD00'}}
        contentInset={{top: 60, bottom: 40}}
        animate>
        <Shadow />
      </LineChart>
      <Wrapper style={{backgroundColor: colors.paleBlue, marginTop: 8}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {time.map((item, i) => {
          const color = item.id === chartTime ? colors.primary : colors.black;
          return (
            <TouchableOpacity
              key={i}
              activeOpacity={0.7}
              onPress={() => setTime(item.id)}>
              <SubtitleMedium style={{color}}>{item.time}</SubtitleMedium>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
