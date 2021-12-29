import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {ActionsCard, Header, NewsCard, PricesGraph} from '@components';
import {Screens} from '@constants';
import {useAppSelector} from '@hooks';
import {Screen} from '@ui';
import {useGetDigitalProductsQuery, useGetNewsQuery} from '@api';

export const Prices: React.FC = () => {
  // @ts-ignore
  const {data = [], isLoading} = useGetNewsQuery();

  const {data: metalsData = [], isLoading: isMetalLoading} =
    //@ts-ignore
    useGetDigitalProductsQuery();

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
        <PricesGraph data={metalsData.data} id={1} isLoading={isMetalLoading} />
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
        <NewsCard data={data} isLoading={isLoading} />
        <View style={{marginBottom: 100}} />
      </Screen>
    </Screen>
  );
};
