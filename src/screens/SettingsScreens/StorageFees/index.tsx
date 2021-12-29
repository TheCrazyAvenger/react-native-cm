import React from 'react';
import {EmptyDataScreen} from '@components';

export const StorageFees: React.FC = () => {
  return (
    <EmptyDataScreen title="No Invoices" text="You have no active invoices." />
  );
};
