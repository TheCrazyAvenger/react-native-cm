import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {EmptyDataScreen, LoadingItem, PriceAlertItem} from '@components';
import {SubtitleMedium} from '@Typography';
import {Screens} from '@constants';
import {Screen} from '@ui';
import {metals} from '@utilities';
import {styles} from './styles';
import {useGetDigitalProductsQuery} from '@api';

export const ChoosePriceAlert: React.FC = () => {
  const navigation: any = useNavigation();

  //@ts-ignore
  const {data = [], isLoading, error} = useGetDigitalProductsQuery();

  if (isLoading || data === []) {
    return <LoadingItem />;
  }

  if (error) {
    return (
      <EmptyDataScreen
        title="No data"
        text="Please refresh page"
        buttonTitle="Refresh"
        onPress={() => navigation.replace(Screens.choosePriceAlert)}
      />
    );
  }

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View>
        <SubtitleMedium style={styles.description}>
          Need to keep track of gold, silver, platinum and palladium price
          movements? Set Alerts to be aware of the latest updates.
        </SubtitleMedium>
      </View>

      {metals.map(item => (
        <PriceAlertItem
          key={item.metal}
          metal={item.metal}
          color={item.color}
          backgroundColor={item.backgroundColor}
          Image={item.Image}
          onPress={() =>
            navigation.navigate(Screens.priceAlertSetUp, {
              id: item.id,
              data: data.data,
            })
          }
        />
      ))}
    </Screen>
  );
};
