import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {HoldingsHeader, NewsCard, PriceGraph} from '@components';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import {useGetDigitalProductsQuery, useGetNewsQuery} from '@api';
import {Screens} from '@constants';

export const HoldingsPalladium: React.FC = () => {
  const navigation: any = useNavigation();

  const {data: newsData = [], isLoading} = useGetNewsQuery({});

  const {data: metalsData = []} = useGetDigitalProductsQuery({});

  return (
    <Screen style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />
      <HoldingsHeader data={metalsData.data} metalType={3} />
      <Screen type="View" style={styles.bodyContainer}>
        <View style={styles.buttons}>
          <View>
            <TextButton
              title="Sell"
              style={styles.button}
              disabled={isLoading}
              onPress={() =>
                navigation.navigate(Screens.sellBuySetup, {
                  data: metalsData.data[3],
                  type: 'Sell',
                })
              }
            />
          </View>
          <View>
            <TextButton
              solid
              title="Buy"
              disabled={isLoading}
              style={styles.button}
              onPress={() =>
                navigation.navigate(Screens.sellBuySetup, {
                  data: metalsData.data[3],
                  type: 'Buy',
                })
              }
            />
          </View>
        </View>

        <PriceGraph metalType={4} id={3} data={metalsData.data} />

        <NewsCard data={newsData} isLoading={isLoading} />
        <View style={{marginBottom: 100}} />
      </Screen>
    </Screen>
  );
};
