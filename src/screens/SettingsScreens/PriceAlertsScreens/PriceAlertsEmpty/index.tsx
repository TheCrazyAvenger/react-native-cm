import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {EmptyDataScreen} from '@components';
import {Screens} from '@constants';
import {useAppSelector} from '@hooks';

export const PriceAlertsEmpty: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <EmptyDataScreen
      title="No Alerts For Now"
      text="Receive instant text notifications when prices go above or below
          your price targets."
      buttonTitle="Create Price Alert"
      onPress={() => navigation.navigate(Screens.choosePriceAlert)}
    />
  );
};
