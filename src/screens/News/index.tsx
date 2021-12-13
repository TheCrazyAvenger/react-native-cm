import React from 'react';
import {NewsCard} from '@components';
import {Screen} from '@ui';
import {useGetFullNewsQuery} from '@api';
import {colors} from '@constants';
import {StatusBar} from 'react-native';

export const News: React.FC = () => {
  //@ts-ignore
  const {data = [], isLoading} = useGetFullNewsQuery();

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={colors.white}
      />
      <NewsCard data={data} isLoading={isLoading} style={{marginTop: 25}} />
    </Screen>
  );
};
