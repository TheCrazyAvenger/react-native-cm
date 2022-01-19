import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StatusBar, View} from 'react-native';
import {
  CredentialsItem,
  FundWithdrawInfo,
  OrderInfo,
  WithdrawTaxItem,
  Wrapper,
} from '@components';
import {Subtitle, SubtitleMedium, TitleMedium} from '@Typography';
import {colors, FUND_TAX, Screens, WITHDRAW_TAX} from '@constants';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import {cmCredentials, getPaymentName, numberWithCommas} from '@utilities';

export const CompleteFundWithdraw: React.FC = () => {
  const navigation: any = useNavigation();

  const route: any = useRoute();

  const {paymentMethod, amount, type, operationType, order, account} =
    route.params;

  useEffect(() => {
    navigation.setOptions({
      title:
        type === 'Fund' ? 'Funding Confirmation' : 'Withdrawing Confirmation',
    });
  }, []);

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        <TitleMedium style={styles.title}>
          {operationType === 'Fund' ? 'You Funded' : 'Withdrawal Requested'}{' '}
          {type === 'Success' ? (
            <Image source={require('@assets/images/settings/complete.png')} />
          ) : (
            <Image source={require('@assets/images/buy/error.png')} />
          )}
        </TitleMedium>

        <FundWithdrawInfo
          style={{marginHorizontal: 0}}
          type={operationType}
          amount={amount}
          account={account}
          method={getPaymentName(paymentMethod)}
        />

        {operationType === 'Withdraw' && (
          <WithdrawTaxItem
            style={{paddingHorizontal: 0, marginTop: 0}}
            amount={amount}
          />
        )}

        <View style={styles.price}>
          <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
          <TitleMedium style={styles.priceTitle}>{`$${numberWithCommas(
            Number(
              operationType === 'Fund'
                ? amount - amount * FUND_TAX
                : amount - amount * WITHDRAW_TAX,
            ).toFixed(2),
          )}`}</TitleMedium>
        </View>
        <Wrapper style={{marginTop: 0, backgroundColor: colors.primary}} />

        <OrderInfo
          style={{marginHorizontal: 0}}
          order={order}
          status={
            type !== 'Success'
              ? 'Error'
              : paymentMethod !== 'cashBalance' &&
                paymentMethod !== 'creditCard'
              ? 'Awaiting Payment'
              : 'Completed'
          }
        />

        {operationType === 'Withdraw' && (
          <SubtitleMedium style={styles.bankWarning}>
            {`Your request to withdraw funds has been submitted and will be processed within 2 business days. You will receive a confirmation email once the transfer has been initiated. You may visit My Account > Settings > Transactions to view the status of your withdrawal order at any time.`}
          </SubtitleMedium>
        )}

        <View style={{marginTop: 20}}>
          <TextButton
            solid
            title={
              type !== 'Success'
                ? 'Return to the Previous Screen'
                : operationType === 'Fund'
                ? 'Fund Again'
                : 'Withdraw Again'
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
      {(paymentMethod === 'eCheck' || paymentMethod === 'bankWire') &&
      operationType === 'Fund' ? (
        <View>
          <View style={{marginBottom: 20}}>
            <Subtitle style={styles.stepsTitle}>Next Steps</Subtitle>
            <SubtitleMedium>
              Thank you for placing an order with CyberMetals.{' '}
              {paymentMethod === 'bankWire' &&
                ' Your required payment steps are indicated below.'}
            </SubtitleMedium>
          </View>
          {paymentMethod === 'eCheck' && operationType === 'Fund' && (
            <View>
              <View
                style={{paddingLeft: 15, paddingRight: 10, marginBottom: 20}}>
                <SubtitleMedium style={{marginBottom: 20}}>
                  1. Please allow 1-2 business days for completion of your ACH
                  payment, at which time you will receive an email stating the
                  order is paid
                </SubtitleMedium>
                <SubtitleMedium>
                  2. After that, please allow up to five business days for the
                  funds to clear, depending on your ordering history.
                </SubtitleMedium>
              </View>
              <SubtitleMedium style={{marginBottom: 20}}>
                You may visit My Account {'>'} Settings {`>`} Transactions to
                view the status of your order at any time.
              </SubtitleMedium>
            </View>
          )}
          {paymentMethod === 'bankWire' && operationType === 'Fund' && (
            <View>
              <View style={{marginBottom: 20}}>
                <SubtitleMedium
                  style={{marginBottom: 20, fontFamily: 'OpenSans-SemiBold'}}>
                  Please send a bank wire for the total amount within 1 business
                  day to:
                </SubtitleMedium>
              </View>
              {cmCredentials.map((item, i) => (
                <CredentialsItem
                  key={i}
                  id={i}
                  title={item.title}
                  value={item.value}
                />
              ))}
            </View>
          )}
        </View>
      ) : null}
    </Screen>
  );
};
