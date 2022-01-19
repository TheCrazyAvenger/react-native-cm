import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {EmptyDataScreen, MetalsCardProps, MetalsItem} from '../..';
import {Screens} from '@constants';
import {styles} from './styles';
import {LoadingItem} from '@components';

export const MetalsCard: React.FC<MetalsCardProps> = ({
  metalId,
  data,
  isLoading,
  error,
}) => {
  const navigation: any = useNavigation();

  const handleHoldings = () => {
    navigation.navigate(Screens.holdings, {id: metalId + 1, data});
  };

  return (
    <View
      style={{...styles.container, height: isLoading || error ? 188 : 'auto'}}>
      {data === [] || isLoading ? (
        <LoadingItem />
      ) : error ? (
        <EmptyDataScreen style={{marginTop: 15}} title="No data" />
      ) : (
        <TouchableOpacity activeOpacity={0.7} onPress={handleHoldings}>
          <MetalsItem data={data.data[metalId]} />
        </TouchableOpacity>
      )}
    </View>
  );
};
