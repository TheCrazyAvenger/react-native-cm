import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {
  HoldingsHeader,
  MetalsDetails,
  NewsCard,
  PriceGraph,
} from '../../components';
import {Screen, TextButton} from '../../ui';
import {styles} from './styles';

export const Holdings: React.FC = () => {
  const route: any = useRoute();
  const {id} = route.params;
  const [metalType, setMetalType] = useState(id);

  const setHandler = (id: number) => {
    setMetalType(id);
  };

  return (
    <Screen style={{paddingHorizontal: 0}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />
      <HoldingsHeader metalType={metalType} setMetal={setHandler} />
      <Screen type="View" style={{paddingTop: 20, paddingBottom: 4}}>
        <MetalsDetails id={metalType} />
        <View style={styles.buttons}>
          <TextButton
            title="Sell"
            style={styles.button}
            onPress={() => console.log('Sell')}
          />

          <TextButton
            solid
            title="Buy"
            style={styles.button}
            onPress={() => console.log('Sell')}
          />
        </View>

        <PriceGraph id={metalType} />

        <NewsCard />
      </Screen>
    </Screen>
  );
};
