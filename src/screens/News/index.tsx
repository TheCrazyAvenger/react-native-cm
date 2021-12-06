import React from 'react';
import {NewsCard} from '@components';
import {Screen} from '@ui';
import {useGetFullNewsQuery} from '@api';

export const News: React.FC = () => {
  //@ts-ignore
  const {data = [], isLoading} = useGetFullNewsQuery();

  return (
    <Screen>
      <NewsCard data={data} isLoading={isLoading} style={{marginTop: 25}} />
    </Screen>
  );
};
