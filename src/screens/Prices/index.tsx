import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {ActionsCard, Header, NewsCard, PricesGraph} from '@components';
import {Screens} from '@constants';
import {useAppSelector} from '@hooks';
import {Screen} from '@ui';

export const Prices: React.FC = () => {
  const [metalType, setMetalType] = useState(1);

  const navigation: any = useNavigation();
  const priceAlerts = useAppSelector(state => state.priceAlerts.priceAlerts);

  const isEmpty =
    priceAlerts.Gold.length === 0 &&
    priceAlerts.Silver.length === 0 &&
    priceAlerts.Platinum.length === 0 &&
    priceAlerts.Palladium.length === 0
      ? true
      : false;

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
        {isEmpty ? (
          <ActionsCard
            title="Create Price Alert"
            description="Receive instant text notifications
          when prices go above or below
          your price targets."
            backgroundColor="#C1D9FA"
            buttonTitle="Create"
            onPress={() => navigation.navigate(Screens.priceAlertsStack)}
          />
        ) : null}
        <NewsCard size="Small" />
      </Screen>
    </Screen>
  );
};
