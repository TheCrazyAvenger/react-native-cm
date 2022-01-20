import React from 'react';
import {EmptyDataScreen, LoadingItem, NewsCard} from '@components';
import {Screen} from '@ui';
import {useGetFullNewsQuery} from '@api';
import {colors} from '@constants';
import {StatusBar} from 'react-native';

export const News: React.FC = () => {
  //@ts-ignore
  const {data = [], isLoading} = useGetFullNewsQuery();

  if (isLoading) {
    return <LoadingItem />;
  }

  return (
    <Screen style={{paddingHorizontal: 20}}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={colors.white}
      />

      {data.length !== 0 ? (
        <NewsCard data={data} isLoading={isLoading} style={{marginTop: 25}} />
      ) : (
        <EmptyDataScreen title="No news" />
      )}
    </Screen>
  );
};
