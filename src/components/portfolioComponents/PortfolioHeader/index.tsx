import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Description, DescriptionBold, TitleMedium} from '@Typography';
import {PieChart} from 'react-native-svg-charts';
import {styles} from './styles';
import {colors} from '@constants';
import {getColor, metals} from '@utilities';

export const PortfolioHeader: React.FC = () => {
  const [graph, setGraph] = useState('pie');
  const data: Array<number> = [];

  metals.map(item => data.push(item.owned));

  const commonOwned = parseFloat(
    (data.reduce((acc, next) => (acc += next)) + 1084.1).toFixed(2),
  );

  const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: metals[index].color,
      },
      key: `pie-${index}`,
    }));

  pieData.push({
    value: 1084,
    svg: {
      fill: colors.black,
    },
    key: `pie-${5}`,
  });

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
        <PieChart
          animate
          style={{height: 200}}
          innerRadius={90}
          outerRadius={100}
          data={pieData}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TitleMedium style={{color: colors.primary}}>
              $ {commonOwned} USD
            </TitleMedium>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Description style={{color: getColor(368.4)}}>
                $368.40 USD
              </Description>
              <Image
                style={{marginLeft: 5}}
                source={require('../../../assets/images/potfolio/upArrow.png')}
              />
            </View>
          </View>
        </PieChart>
      ) : null}
    </View>
  );
};
