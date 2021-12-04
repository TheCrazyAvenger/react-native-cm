import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {ProductItem} from '@components';
import {Screens} from '@constants';
import {Screen} from '@ui';
import {sell} from '@utilities';

export const ChooseSell: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  return (
    <Screen style={{paddingVertical: 24}}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      {sell.map(item => (
        <ProductItem
          key={item.id}
          metal={item.metal}
          price={item.ask}
          vault={item.vault}
          premium={item.premium}
          storageFee={item.storageFee}
          spread={item.spread}
          onPress={() => navigation.navigate(Screens.buySetup, {data: item})}
          style={{marginBottom: item.id === 4 ? 56 : 30}}
          type="Sell"
        />
      ))}
    </Screen>
  );
};
