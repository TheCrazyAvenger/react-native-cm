import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {ProductItem} from '@components';
import {Screens} from '@constants';
import {Screen} from '@ui';
import {buy} from '@utilities';

export const ChooseBuy: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  return (
    <Screen style={{paddingVertical: 24}}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      {buy.map(item => (
        <ProductItem
          key={item.id}
          metal={item.metal}
          price={item.ask}
          vault={item.vault}
          premium={item.premium}
          storageFee={item.storageFee}
          spread={item.spread}
          onPress={() =>
            navigation.navigate(Screens.sellBuySetup, {data: item, type: 'Buy'})
          }
          style={{marginBottom: item.id === 4 ? 56 : 30}}
        />
      ))}
    </Screen>
  );
};