import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StatusBar} from 'react-native';
import {
  ActionsCard,
  ActivityCard,
  Header,
  MetalsCard,
  NewsCard,
} from '../../components';
import {Screens} from '../../constants';
import {useAppSelector} from '../../hooks/hooks';
import {Screen} from '../../ui';
import {metals} from '../../utilities';

export const Home: React.FC = () => {
  const navigation: any = useNavigation();

  const operations = useAppSelector(state => state.operations.operations);
  const autoBuy = useAppSelector(state => state.autoBuy.autoBuy);

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

        {operations.buy.length === 0 ? (
          <ActionsCard
            title="Start Trading"
            description="Build your portfolio with CyberMetals."
            backgroundColor="#C1D9FA"
            buttonTitle="Buy Now"
            onPress={() => navigation.navigate(Screens.buyStack)}
          />
        ) : null}
        {autoBuy.length === 0 ? (
          <ActionsCard
            title="Set Up Auto Buy"
            description="Start building your wealth with automated purchases."
            backgroundColor="#FFEBB3"
            buttonTitle="Start Now"
            onPress={() => navigation.navigate(Screens.autoBuyStack)}
          />
        ) : null}
        <ActivityCard />
        <NewsCard />
      </Screen>
    </Screen>
  );
};
