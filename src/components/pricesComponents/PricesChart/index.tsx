import React from 'react';
import {View} from 'react-native';
import {LineChart, Path} from 'react-native-svg-charts';
import {PricesChartProps} from '../..';
import {TextButton} from '@ui';
import {styles} from './styles';
import {Screens} from '@constants';
import {useNavigation} from '@react-navigation/native';

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

export const PricesChart: React.FC<PricesChartProps> = ({
  chartMetal,
  lineColor,
}) => {
  const navigation: any = useNavigation();

  const data = [
    [10, 10, 4, 91, 35, 53, -53, 24, 50, 35, 53, -53, 24, 50, -20, 10],
    [10, 10, 40, 95, -4, -24, 5, 45, 50, 91, 35, 53, -53, -20, 10],
    [85, 91, 35, 4, 91, 35, 53, -53, 24, 50, -20, 43, 54, 10],
    [10, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, 0, 10, 40, 95],
  ];

  return (
    <View>
      <LineChart
        style={{height: 160}}
        data={data[chartMetal - 1]}
        svg={{stroke: lineColor}}
        contentInset={{top: 60, bottom: 40}}>
        {/* 
        // @ts-ignore */}
        <Shadow lineColor={lineColor} />
      </LineChart>

      <View style={styles.buttons}>
        <View style={{width: '47%'}}>
          <TextButton title="Sell" onPress={() => console.log('Sell')} />
        </View>
        <View style={{width: '47%'}}>
          <TextButton
            title="Buy"
            solid
            onPress={() =>
              navigation.navigate(Screens.buyStack, {
                metalType: chartMetal - 1,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};
