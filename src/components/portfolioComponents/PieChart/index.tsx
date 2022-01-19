import {GainsLossesArrow} from '@assets/images/potfolio';
import {PieChartProps} from '@components';
import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {Description, TitleMedium} from '@Typography';
import {getColor, getMetalsColor, numberWithCommas} from '@utilities';
import React from 'react';
import {useWindowDimensions, View} from 'react-native';
import {VictoryPie} from 'victory-native';
import {styles} from './styles';

export const PieChart: React.FC<PieChartProps> = ({
  gainsLosses,
  commonOwned,
}) => {
  const {width} = useWindowDimensions();

  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);
  const cashBalance = useAppSelector(state => state.auth.cashBalance);

  const pieColors: any = [];

  const pieData: any = Object.keys(ownedMetals)
    .filter(value => ownedMetals[value] > 0)
    .map(value => {
      pieColors.push(getMetalsColor(value));
      return {
        y: ownedMetals[value] * 1887,
        x: ownedMetals,
        label: ' ',
      };
    });

  pieData.push({
    x: 'Cash Balance',
    y: cashBalance,
    label: ' ',
  });

  pieColors.push('black');

  return (
    <View>
      <VictoryPie
        colorScale={pieColors}
        origin={{y: 160, x: width / 2.25}}
        innerRadius={130}
        data={pieData}
      />
      <View style={styles.pieInfo}>
        <TitleMedium style={{color: colors.primary}}>
          $ {commonOwned} USD
        </TitleMedium>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Description style={{color: getColor(gainsLosses)}}>
            {`${gainsLosses < 0 ? '-' : '+'}$${numberWithCommas(
              Number(Math.abs(gainsLosses)).toFixed(2),
            )} USD`}
          </Description>
          <View
            style={{
              marginLeft: 5,
              transform: [{rotate: gainsLosses >= 0 ? '0deg' : '180deg'}],
            }}>
            <GainsLossesArrow fill={gainsLosses >= 0 ? 'green' : 'red'} />
          </View>
        </View>
      </View>
    </View>
  );
};
