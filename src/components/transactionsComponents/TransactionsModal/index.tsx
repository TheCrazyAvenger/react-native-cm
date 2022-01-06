import React from 'react';
import {Modal, ScrollView, View} from 'react-native';
import {
  BuyingInfo,
  FundWithdrawInfo,
  OrderInfo,
  ReedemInfo,
  TaxItem,
  WithdrawTaxItem,
  Wrapper,
} from '../..';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {TransactionsModalProps} from '../..';
import {SubtitleMedium, TitleMedium} from '@Typography';
import {TextButton} from '@ui';
import {numberWithCommas} from '@utilities';

export const TransactionsModal: React.FC<TransactionsModalProps> = ({
  visible,
  date,
  spot,
  product,
  price_with_tax,
  type,
  cart,
  shippingMethod,
  time,
  order,
  total,
  account,
  oz,
  paymentMethod,
  onPress,
}) => {
  const navigation: any = useNavigation();

  const openScreen = (screen: string, data?: any) => {
    onPress();
    navigation.navigate(screen, data);
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <ScrollView
        style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.menu}>
            <TitleMedium style={styles.title}>
              {type === 'Buy'
                ? 'You Bought'
                : type === 'Sell'
                ? 'You Sold'
                : type === 'Fund'
                ? 'You Fund'
                : type === 'Withdraw'
                ? 'Withdrawal Requested'
                : type === 'Reedem'
                ? 'You Redeemed'
                : 'Unknown'}
            </TitleMedium>

            {type === 'Buy' || type === 'Sell' ? (
              <BuyingInfo
                type={type}
                metal={product}
                amount={total}
                spot={spot}
                account={account}
                amountOz={oz}
                paymentMethod={paymentMethod}
              />
            ) : null}
            {type === 'Fund' || type === 'Withdraw' ? (
              <View>
                <FundWithdrawInfo
                  style={{marginHorizontal: 0}}
                  type={type}
                  account={account}
                  amount={total}
                  method={paymentMethod}
                />
                {type === 'Fund' && (
                  <View style={styles.price}>
                    <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
                    <TitleMedium
                      style={styles.priceTitle}>{`$${numberWithCommas(
                      Number(price_with_tax).toFixed(2),
                    )}`}</TitleMedium>
                  </View>
                )}
              </View>
            ) : null}

            {type === 'Withdraw' && (
              <View>
                <WithdrawTaxItem
                  style={{paddingHorizontal: 0, marginTop: 0}}
                  amount={total}
                  price_with_tax={price_with_tax}
                />

                <View style={styles.price}>
                  <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
                  <TitleMedium style={styles.priceTitle}>{`$${numberWithCommas(
                    Number(price_with_tax).toFixed(2),
                  )}`}</TitleMedium>
                </View>
              </View>
            )}

            {type === 'Reedem' ? (
              <View>
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
                  total={+total}
                />
              </View>
            ) : null}

            <Wrapper style={{marginTop: 0, backgroundColor: colors.primary}} />

            <OrderInfo
              style={{marginHorizontal: 0}}
              order={order}
              status={
                type === 'Buy' || type === 'Sell'
                  ? 'Completed'
                  : type === 'Reedem'
                  ? 'Awaiting Processing by JM'
                  : paymentMethod !== 'cashBalance' &&
                    paymentMethod !== 'creditCard'
                  ? 'Awaiting Payment'
                  : 'Completed'
              }
              date={date}
              time={time}
            />

            {type === 'Withdraw' && (
              <SubtitleMedium style={styles.bankWarning}>
                {`Your request to withdraw funds has been submitted and will be processed within 2 business days. You will receive a confirmation email once the transfer has been initiated. You may visit My Account > Settings > Transactions to view the status of your withdrawal order at any time.`}
              </SubtitleMedium>
            )}

            <View style={{marginTop: 20}}>
              <TextButton
                solid
                title={`${type} Again`}
                style={{marginBottom: 15}}
                onPress={() =>
                  type === 'Buy'
                    ? openScreen(Screens.sellBuyStack, {type: 'Buy'})
                    : type === 'Sell'
                    ? openScreen(Screens.sellBuyStack, {type: 'Sell'})
                    : type === 'Fund'
                    ? openScreen(Screens.fundWithdrawStack, {type: 'Fund'})
                    : type === 'Withdraw'
                    ? openScreen(Screens.fundWithdrawStack, {type: 'Withdraw'})
                    : openScreen(Screens.reedemStack)
                }
              />
              <TextButton title="Go Back to Transactions" onPress={onPress} />
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};
