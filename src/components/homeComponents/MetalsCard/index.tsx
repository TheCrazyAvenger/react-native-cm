import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {MetalsCardProps, MetalsItem} from '../..';
import {Screens} from '@constants';
import {styles} from './styles';
import {useGetDigitalProductsQuery} from '@api';
import {LoadingItem} from '@components';
import {Subtitle} from '@Typography';

export const MetalsCard: React.FC<MetalsCardProps> = ({metalId}) => {
  const navigation: any = useNavigation();

  const {data = [], isLoading, error} =
    // @ts-ignore
    useGetDigitalProductsQuery();

  return (
    <View
      style={{...styles.container, height: isLoading || error ? 188 : 'auto'}}>
      {data === [] || isLoading ? (
        <LoadingItem />
      ) : error ? (
        <View style={styles.noData}>
          <Subtitle>No data</Subtitle>
        </View>
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
