import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {HoldingsHeader, MetalsDetails, NewsCard, PriceGraph} from '@components';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';

export const Holdings: React.FC = () => {
  const route: any = useRoute();
  const {id} = route.params;
  const [metalType, setMetalType] = useState(id);

  return (
    <Screen style={{paddingHorizontal: 0}}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor={'transparent'}
      />
      <HoldingsHeader metalType={metalType} setMetal={setMetalType} />
      <Screen type="View" style={{paddingTop: 20, paddingBottom: 4}}>
        <MetalsDetails id={metalType} />
        <View style={styles.buttons}>
          <View>
            <TextButton
              title="Sell"
              style={styles.button}
              onPress={() => console.log('Sell')}
            />
          </View>
          <View>
            <TextButton
              solid
              title="Buy"
              style={styles.button}
              onPress={() => console.log('Buy')}
            />
          </View>
        </View>
        <PriceGraph id={metalType} />

        <NewsCard />
      </Screen>
    </Screen>
  );
};
