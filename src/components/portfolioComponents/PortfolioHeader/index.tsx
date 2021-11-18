import React from 'react';
import {View} from 'react-native';

import {Description, Title, TitleMedium} from '../../Typography';
import {PieChart} from 'react-native-svg-charts';

import {styles} from './styles';
import {colors} from '../../../constants';
import {metals} from '../../../utilities';

export const PortfolioHeader: React.FC = () => {
  const data: Array<number> = [];

  metals.map(item => data.push(item.owned));

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: metals[index].color,
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
    }));

  pieData.push({
    value: 1.084,
    svg: {
      fill: colors.black,
      onPress: () => console.log('press'),
    },
    key: `pie-${5}`,
  });

  return (
    <View style={styles.container}>
      <TitleMedium style={{alignSelf: 'center', marginBottom: 20}}>
        Portfolio
      </TitleMedium>
      <PieChart
        animate
        style={{height: 200}}
        innerRadius={90}
        outerRadius={100}
        data={pieData}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TitleMedium style={{color: colors.primary}}>
            $1,882.80 USD
          </TitleMedium>
          <Description>$368.40 USD</Description>
        </View>
      </PieChart>
      <View style={{alignItems: 'center'}}></View>
    </View>
  );
};
