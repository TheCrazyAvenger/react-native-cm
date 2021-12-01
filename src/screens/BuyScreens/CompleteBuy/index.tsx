import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import {BuyingInfo, OrderInfo, Wrapper} from '../../../components';
import {TitleMedium} from '../../../components/Typography';
import {colors, Screens} from '../../../constants';
import {Screen, TextButton} from '../../../ui';

import {styles} from './styles';

export const CompleteBuy: React.FC = () => {
  const navigation: any = useNavigation();

  const route: any = useRoute();

  const {amountOz, paymentMethod, amount, data, type} = route.params;
  const {metal, spot} = data;

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        <TitleMedium style={styles.title}>
          You Bought{' '}
          {type === 'Success' ? (
            <Image
              source={require('../../../assets/images/settings/complete.png')}
            />
          ) : (
            <Image source={require('../../../assets/images/buy/error.png')} />
          )}
        </TitleMedium>

        <BuyingInfo
          metal={metal}
          amount={amount}
          spot={spot}
          amountOz={amountOz}
          paymentMethod={paymentMethod}
        />
        <Wrapper style={{marginTop: 0, backgroundColor: colors.primary}} />

        <OrderInfo
          order={
            type === 'Success'
              ? Math.round(Math.random() * (10000 - 1) + 1)
              : '-'
          }
          status={type === 'Success' ? 'Completed' : 'Error'}
        />

        <View style={{marginTop: 20}}>
          <TextButton
            solid
            title={
              type === 'Success' ? 'Buy Again' : 'Return to the Previous Screen'
            }
            style={{marginBottom: 15}}
            onPress={() =>
              type === 'Success' ? navigation.pop(3) : navigation.pop(1)
            }
          />
          <TextButton
            title="Go to Dashboard"
            onPress={() => navigation.replace(Screens.bottomTabs)}
          />
        </View>
      </View>
    </Screen>
  );
};
