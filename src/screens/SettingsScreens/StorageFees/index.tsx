import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {EmptyDataScreen} from '@components';

export const StorageFees: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <EmptyDataScreen title="No Invoices" text="You have no active invoices." />
  );
};
