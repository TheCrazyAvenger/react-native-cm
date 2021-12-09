import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {LoadingItem, ProductItem} from '@components';
import {Screens} from '@constants';
import {Screen} from '@ui';
import {useGetDigitalProductsQuery} from '@api';

export const ChooseSell: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  //@ts-ignore
  const {data = [], isLoading} = useGetDigitalProductsQuery();

  if (isLoading || data === []) {
    return <LoadingItem />;
  }

  return (
    <Screen style={{paddingVertical: 24}}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      {data.data.map((item: any) => (
        <ProductItem
          key={item.id}
          metal={item.name}
          price={item.sell}
          vault="JM Bullion"
          premium={item.premium}
          storageFee={item.storage_fee}
          spread={item.spread}
          onPress={() =>
            navigation.navigate(Screens.sellBuySetup, {
              data: item,
              type: 'Sell',
            })
          }
          style={{marginBottom: item.id === 4 ? 56 : 30}}
          type="Sell"
        />
      ))}
    </Screen>
  );
};
