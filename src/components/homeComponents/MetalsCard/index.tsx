import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MetalsCardProps, MetalsItem} from '../..';
import {Screens} from '@constants';
import {styles} from './styles';
import {useGetDigitalProductsQuery} from '@api';
import {LoadingItem} from '@components';

export const MetalsCard: React.FC<MetalsCardProps> = ({metalId}) => {
  const navigation: any = useNavigation();

  const {data = [], isLoading} =
    // @ts-ignore
    useGetDigitalProductsQuery();

  return (
    <View style={styles.container}>
      {data === [] || isLoading ? (
        <LoadingItem />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate(Screens.holdings, {id: metalId + 1, data})
          }>
          <MetalsItem data={data.data[metalId]} />
        </TouchableOpacity>
      )}
    </View>
  );
};
