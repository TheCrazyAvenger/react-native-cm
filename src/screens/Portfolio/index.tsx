import React from 'react';
import {StatusBar, View} from 'react-native';
import {MetalsInfo, PortfolioHeader} from '../../components';
import {Subtitle} from '../../components/Typography';
import {Screen} from '../../ui';
import {metals} from '../../utilities';
import {styles} from './styles';

export const Portfolio: React.FC = () => {
  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <PortfolioHeader />
      <View>
        {metals.map(item => (
          <MetalsInfo key={item.metal} data={item} />
        ))}
      </View>
      <View style={styles.cardItem}>
        <Subtitle style={styles.cardTitle}>Cash</Subtitle>
        <Subtitle style={styles.cardTitle}>$1,084.10 USD</Subtitle>
      </View>
    </Screen>
  );
};
