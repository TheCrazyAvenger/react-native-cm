import React, {useState} from 'react';
import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import {Description, DescriptionBold, TitleMedium} from '@Typography';
import {styles} from './styles';
import {colors} from '@constants';
import {getColor, getMetalsColor, metals, numberWithCommas} from '@utilities';
import {useAppSelector} from '@hooks';
import {GainsLossesArrow} from '@assets/images/potfolio';
import {VictoryPie} from 'victory-native';

export const PortfolioHeader: React.FC<{gainsLosses: number}> = ({
  gainsLosses,
}) => {
  const [graph, setGraph] = useState('pie');
  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);
  const cashBalance = useAppSelector(state => state.auth.cashBalance);

  const {width} = useWindowDimensions();

  const pieColors: any = [];

  const commonOwned = numberWithCommas(
    Number(
      Object.values(ownedMetals).reduce(
        (acc, next) => (acc += next * 1887),
        0,
      ) + cashBalance,
    ).toFixed(2),
  );

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
    <View style={styles.container}>
      <TitleMedium style={{alignSelf: 'center', marginBottom: 10}}>
        Portfolio
      </TitleMedium>
      <View style={styles.changeGraph}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => setGraph('pie')}>
          <DescriptionBold
            style={{
              marginRight: 20,
              color: graph === 'pie' ? colors.primary : colors.black,
            }}>
            Breakdown
          </DescriptionBold>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setGraph('timeline')}>
          <DescriptionBold
            style={{
              color: graph === 'timeline' ? colors.primary : colors.black,
            }}>
            Timeline
          </DescriptionBold>
        </TouchableOpacity>
      </View>

      {graph === 'pie' ? (
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
      ) : (
        <View style={{marginBottom: 100}} />
      )}
    </View>
  );
};
