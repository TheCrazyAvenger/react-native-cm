import React from 'react';
import {EmptyDataScreen} from '@components';

export const Invoices: React.FC = () => {
  return (
    <EmptyDataScreen
      title="No Invoice History"
      text="Storage invoices will be sent quarterly to your email address on file. Visit our portfolio to view the current holdings in storage."
      buttonTitle="View Portfolio"
      onPress={() => console.log('View Portfolio')}
    />
  );
};
