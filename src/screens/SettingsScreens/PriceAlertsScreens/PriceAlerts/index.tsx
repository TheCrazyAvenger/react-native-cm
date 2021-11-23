import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, StatusBar} from 'react-native';
import {
  EmptyDataScreen,
  MetalPicker,
  PriceAlertListItem,
  Wrapper,
} from '../../../../components';
import {colors, Screens} from '../../../../constants';
import {useAppSelector} from '../../../../hooks/hooks';
import {Screen, TextButton} from '../../../../ui';
import {metals} from '../../../../utilities';

export const PriceAlerts: React.FC = () => {
  const navigation: any = useNavigation();
  const priceAlerts = useAppSelector(state => state.priceAlerts.priceAlerts);
  const [metalType, setMetalType] = useState(1);

  if (priceAlerts.length === 0) {
    return (
      <EmptyDataScreen
        title="No Alerts For Now"
        text="Receive instant text notifications when prices go above or below
          your price targets."
        onPress={() => navigation.navigate(Screens.choosePriceAlert)}
      />
    );
  }

  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <MetalPicker
        colorfull={true}
        currentMetal={metalType}
        onPress={setMetalType}
      />
      <Wrapper
        style={{
          marginTop: 4,
          marginBottom: 24,
          backgroundColor: colors.primary,
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {priceAlerts.map(
          (item: any) =>
            item.metal === metals[metalType - 1].metal && (
              <PriceAlertListItem
                key={item.id}
                metal={item.metal}
                backgroundColor={item.backgroundColor}
                condition={item.condition}
                date={item.date}
                time={item.time}
                id={item.id}
                color={item.color}
                value={item.value}
              />
            ),
        )}
      </ScrollView>
      <TextButton
        title="Create Price Alert"
        solid
        style={{marginBottom: 25}}
        onPress={() => navigation.navigate(Screens.choosePriceAlert)}
      />
    </Screen>
  );
};
