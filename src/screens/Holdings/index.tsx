import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {HoldingsHeader, MetalsDetails, NewsCard, PriceGraph} from '@components';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import {useGetNewsQuery} from '@api';
import {Screens} from '@constants';

export const Holdings: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {id, data} = route.params;
  const [metalType, setMetalType] = useState(id);

  //@ts-ignore
  const {data: newsData = [], isLoading} = useGetNewsQuery();

  return (
    <Screen style={{paddingHorizontal: 0}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />
      <HoldingsHeader
        data={data.data}
        metalType={metalType}
        setMetal={setMetalType}
      />
      <Screen type="View" style={{paddingTop: 20, paddingBottom: 4}}>
        <View style={styles.buttons}>
          <View>
            <TextButton
              title="Sell"
              style={styles.button}
              onPress={() =>
                navigation.navigate(Screens.sellBuyStack, {type: 'Sell'})
              }
            />
          </View>
          <View>
            <TextButton
              solid
              title="Buy"
              style={styles.button}
              onPress={() =>
                navigation.navigate(Screens.sellBuyStack, {type: 'Buy'})
              }
            />
          </View>
        </View>

        <PriceGraph id={metalType} data={data.data} />

        <NewsCard data={newsData} isLoading={isLoading} />
      </Screen>
    </Screen>
  );
};
