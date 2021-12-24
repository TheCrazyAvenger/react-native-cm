import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StatusBar, View} from 'react-native';
import {OrderInfo, ReedemInfo, TaxItem, Wrapper} from '@components';
import {SubtitleMedium, TitleMedium} from '@Typography';
import {colors, Screens} from '@constants';
import {Screen, TextButton} from '@ui';

import {styles} from './styles';

export const CompleteReedem: React.FC = () => {
  const navigation: any = useNavigation();

  const route: any = useRoute();

  useEffect(() => {
    navigation.setOptions({
      title: 'Redeeming Confirmation',
    });
  }, []);

  const {shippingMethod, paymentMethod, cart, type, amount, order, account} =
    route.params;

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        <TitleMedium style={styles.title}>
          You Redeemed{' '}
          {type === 'Success' ? (
            <Image
              source={require('../../../assets/images/settings/complete.png')}
            />
          ) : (
            <Image source={require('../../../assets/images/buy/error.png')} />
          )}
        </TitleMedium>

        <ReedemInfo
          paymentMethod={paymentMethod}
          shippingMethod={shippingMethod}
          cart={cart}
          account={account}
        />

        <TaxItem
          style={{marginTop: 0}}
          subtotal={0}
          salesTax={0}
          shippingFee={shippingMethod}
          shippingTax={0}
          total={amount}
        />
        <Wrapper style={{marginTop: 0, backgroundColor: colors.primary}} />

        <OrderInfo
          style={{marginHorizontal: 0, marginBottom: 20}}
          order={order}
          status={type === 'Success' ? 'Awaiting Processing by JM' : 'Error'}
        />

        <View>
          <SubtitleMedium style={styles.info}>
            Redemption confirmed! Your order will be fulfilled by JM Bullion. JM
            Bullion will send periodic shipping updates to the email address on
            file with CyberMetals. You can also check your order status anytime
            at{' '}
            <SubtitleMedium style={styles.infoInner}>
              Order Status - JM Bullion.
            </SubtitleMedium>
          </SubtitleMedium>
        </View>

        <View style={{marginTop: 20}}>
          <TextButton
            solid
            title={
              type !== 'Success'
                ? 'Return to the Previous Screen'
                : 'Redeem Again'
            }
            style={{marginBottom: 15}}
            onPress={() =>
              type === 'Success' ? navigation.pop(3) : navigation.pop(1)
            }
          />
          <TextButton
            title="Go to Dashboard"
            onPress={() => navigation.navigate(Screens.bottomTabs)}
          />
        </View>
      </View>
    </Screen>
  );
};
