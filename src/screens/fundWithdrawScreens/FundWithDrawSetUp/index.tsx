import {useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {TitleMedium} from '@Typography';
import {FundWithDrawSetUpForm} from '../../../forms';
import {Screen} from '@ui';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {FundWithdrawInfo} from '@components';

export const FundWithDrawSetUp: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const cashBalance = useAppSelector(state => state.auth.cashBalance);

  const {type} = route.params;

  console.log(cashBalance);

  return (
    <Screen>
      <View style={styles.container}>
        <TitleMedium style={styles.mainTitle}>
          {type === 'Fund' ? 'Funding' : 'Withdrawing'} Preferences
        </TitleMedium>
        <FundWithdrawInfo cashBalance={cashBalance} />

        <FundWithDrawSetUpForm />
      </View>
    </Screen>
  );
};
