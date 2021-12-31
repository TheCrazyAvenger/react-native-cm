import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Description, DescriptionBold, Subtitle, TitleMedium} from '@Typography';
import {styles} from './styles';
import {colors} from '@constants';
import {
  PieChart,
  PortfolioHeaderProps,
  TimelineChart,
  Wrapper,
} from '@components';

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({
  gainsLosses,
  isEmpty,
  commonOwned,
}) => {
  const [graph, setGraph] = useState('pie');

  return (
    <View style={styles.container}>
      <TitleMedium style={styles.mainTitle}>Portfolio</TitleMedium>
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
        <View style={{paddingHorizontal: 26}}>
          {isEmpty ? (
            <View>
              <Subtitle style={styles.title}>Insufficient data</Subtitle>
              <Description style={{...styles.description}}>
                Top up your balance or make a purchase
              </Description>

              <Wrapper style={styles.emptyData} />
            </View>
          ) : (
            <PieChart commonOwned={commonOwned} gainsLosses={gainsLosses} />
          )}
        </View>
      ) : (
        <TimelineChart />
      )}
    </View>
  );
};
