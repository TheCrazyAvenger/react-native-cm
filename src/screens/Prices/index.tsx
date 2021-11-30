import React from 'react';
import {StatusBar} from 'react-native';
import {
  ActionsCard,
  ActivityCard,
  Header,
  MetalsCard,
  NewsCard,
} from '../../components';
import {Screen} from '../../ui';
import {metals} from '../../utilities';

export const Prices: React.FC = () => {
  return (
    <Screen style={{paddingHorizontal: 0}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Header />
      <Screen type="View" style={{paddingTop: 20, paddingBottom: 4}}>
        {metals.map(item => (
          <MetalsCard key={item.metal} data={item} />
        ))}

        <ActionsCard
          title="Start Trading"
          description="Build your portfolio with CyberMetals."
          backgroundColor="#C1D9FA"
          buttonTitle="Buy Now"
          onPress={() => console.log(1)}
        />
        <ActionsCard
          title="Set Up Auto Buy"
          description="Start building your wealth with automated purchases."
          backgroundColor="#FFEBB3"
          buttonTitle="Start Now"
          onPress={() => console.log(2)}
        />
        <ActivityCard />
        <NewsCard />
      </Screen>
    </Screen>
  );
};
