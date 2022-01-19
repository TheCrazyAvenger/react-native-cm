import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {HoldingsHeader, NewsCard, PriceGraph} from '@components';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import {useGetDigitalProductsQuery, useGetNewsQuery} from '@api';
import {Screens} from '@constants';
import {metals} from '@utilities';

export const HoldingsGold: React.FC = () => {
  const navigation: any = useNavigation();

  console.log(navigation.isFocused());

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.setOptions({
        tabBarStyle: {backgroundColor: metals[0].color},
      });

      navigation.getParent().setOptions({
        headerStyle: {
          backgroundColor: metals[0].color,
        },
      });
    });

    return unsubscribe;
  }, [navigation]);

  const {data: newsData = [], isLoading} = useGetNewsQuery({});

  const {data: metalsData = []} = useGetDigitalProductsQuery({});

  return (
    <Screen style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />
      <HoldingsHeader data={metalsData.data} metalType={0} />
      <Screen type="View" style={styles.bodyContainer}>
        <View style={styles.buttons}>
          <View>
            <TextButton
              title="Sell"
              style={styles.button}
              disabled={isLoading}
              onPress={() =>
                navigation.navigate(Screens.sellBuySetup, {
                  data: metalsData.data[0],
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
                  data: metalsData.data[0],
                  type: 'Buy',
                })
              }
            />
          </View>
        </View>

        <PriceGraph metalType={1} id={0} data={metalsData.data} />

        <NewsCard data={newsData} isLoading={isLoading} />
        <View style={{marginBottom: 100}} />
      </Screen>
    </Screen>
  );
};
