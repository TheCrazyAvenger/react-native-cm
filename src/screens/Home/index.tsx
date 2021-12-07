import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {
  ActionsCard,
  ActivityCard,
  Header,
  LoadingItem,
  MetalsCard,
  NewsCard,
} from '@components';
import {Screens} from '@constants';
import {useAppSelector} from '@hooks';
import {Screen} from '@ui';
import {metals} from '@utilities';
import {useGetDigitalProductsQuery, useGetNewsQuery} from '@api';

export const Home: React.FC = () => {
  const navigation: any = useNavigation();

  const operations = useAppSelector(state => state.operations.operations);
  const autoBuy = useAppSelector(state => state.autoBuy.autoBuy);

  // @ts-ignore
  const {data = [], isLoading} = useGetNewsQuery();

  return (
    <Screen style={{paddingHorizontal: 0}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Header />
      <Screen type="View" style={{paddingTop: 20, paddingBottom: 4}}>
        <View>
          <MetalsCard metalId={0} />
          <MetalsCard metalId={1} />
          <MetalsCard metalId={2} />
          <MetalsCard metalId={3} />
        </View>

        {operations.length === 0 ? (
          <ActionsCard
            title="Start Trading"
            description="Build your portfolio with CyberMetals."
            backgroundColor="#C1D9FA"
            buttonTitle="Buy Now"
            onPress={() =>
              navigation.navigate(Screens.sellBuyStack, {type: 'Buy'})
            }
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
        <NewsCard data={data} isLoading={isLoading} />
      </Screen>
    </Screen>
  );
};
