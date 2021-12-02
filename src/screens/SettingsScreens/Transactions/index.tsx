import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {EmptyDataScreen} from '@components';

export const Transactions: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <EmptyDataScreen
      title="No Transactions History"
      text="Get started today to experience a new way to invest in precious metals."
      buttonTitle="Start Investing"
      onPress={() => console.log('Start Investing')}
    />
  );
};
