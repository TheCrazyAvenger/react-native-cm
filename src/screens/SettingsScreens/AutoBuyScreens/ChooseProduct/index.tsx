import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import {EmptyDataScreen, LoadingItem, ProductItem} from '@components';
import {Screens} from '@constants';
import {Screen} from '@ui';
import {useGetDigitalProductsQuery} from '@api';

export const ChooseProduct: React.FC = () => {
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
        onPress={() => navigation.replace(Screens.chooseProduct)}
      />
    );
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
          price={item.buy}
          vault="JM Bullion"
          premium={item.premium}
          storageFee={item.storage_fee}
          spread={item.spread}
          onPress={() =>
            navigation.navigate(Screens.autoBuySetUp, {data: item})
          }
          style={{marginBottom: item.id === 4 ? 56 : 30}}
        />
      ))}
    </Screen>
  );
};
