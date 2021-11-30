import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {
  ActionsCard,
  ActivityCard,
  Header,
  MetalsCard,
  NewsCard,
  PricesGraph,
} from '../../components';
import {Screens} from '../../constants';
import {Screen} from '../../ui';
import {metals} from '../../utilities';

export const Prices: React.FC = () => {
  const [metalType, setMetalType] = useState(1);

  const navigation: any = useNavigation();

  return (
    <Screen style={{paddingHorizontal: 0}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Header />
      <Screen type="View" style={{paddingTop: 20, paddingBottom: 4}}>
        <PricesGraph id={metalType} />
        <ActionsCard
          title="Create Price Alert"
          description="Receive instant text notifications
          when prices go above or below
          your price targets."
          backgroundColor="#C1D9FA"
          buttonTitle="Create"
          onPress={() => navigation.navigate(Screens.priceAlertsStack)}
        />
        <NewsCard />
      </Screen>
    </Screen>
  );
};
