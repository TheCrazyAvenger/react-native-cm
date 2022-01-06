import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import {AutoBuyInfo} from '@components';
import {TitleMedium} from '@Typography';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';

export const CompleteAutoBuy: React.FC = () => {
  const navigation: any = useNavigation();

  const route: any = useRoute();

  const {
    type,
    metal,
    amount,
    endDate,
    frequency,
    paymentMethod,
    startDate,
    account,
    usedAmount,
  } = route.params;

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        {type ? (
          <TitleMedium style={styles.title}>
            Auto Buy Update Complete!
          </TitleMedium>
        ) : (
          <TitleMedium style={styles.title}>
            Auto Buy Setup Complete!{' '}
            <Image source={require('@assets/images/settings/complete.png')} />
          </TitleMedium>
        )}

        <AutoBuyInfo
          metal={metal}
          amount={amount}
          usedAmount={usedAmount}
          frequency={frequency}
          paymentMethod={paymentMethod}
          startDate={startDate}
          endDate={endDate}
          account={account}
        />

        <View>
          {type ? (
            <TextButton
              solid
              title="Got it"
              onPress={() => navigation.pop(3)}
            />
          ) : (
            <>
              <TextButton
                solid
                style={{marginBottom: 20}}
                title="Set up another Auto Buy"
                onPress={() => navigation.pop(2)}
              />
              <TextButton
                title="Go to Dashboard"
                style={{marginBottom: 5}}
                onPress={() => navigation.pop(3)}
              />
            </>
          )}
        </View>
      </View>
    </Screen>
  );
};
