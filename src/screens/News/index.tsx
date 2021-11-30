import React from 'react';
import {NewsCard} from '../../components';
import {Screen} from '../../ui';

export const News: React.FC = () => {
  return (
    <Screen>
      <NewsCard size="Full" style={{marginTop: 25}} />
    </Screen>
  );
};
