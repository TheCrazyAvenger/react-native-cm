import React from 'react';
import {Modal, ScrollView, View} from 'react-native';
import {
  BuyingInfo,
  FundWithdrawInfo,
  OrderInfo,
  ReedemInfo,
  TaxItem,
  Wrapper,
} from '../..';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {TransactionsModalProps} from '../..';
import {SubtitleMedium, TitleMedium} from '@Typography';
import {TextButton} from '@ui';
import {getPaymentName, numberWithCommas} from '@utilities';

export const TransactionsModal: React.FC<TransactionsModalProps> = ({
  visible,
  date,
  spot,
  product,
  type,
  cart,
  shippingMethod,
  time,
  order,
  total,
  oz,
  paymentMethod,
  onPress,
}) => {
  const navigation: any = useNavigation();
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
                amountOz={oz}
                paymentMethod={paymentMethod}
              />
            ) : null}
            {type === 'Fund' || type === 'Withdraw' ? (
              <FundWithdrawInfo
                style={{marginHorizontal: 0}}
                type={type}
                amount={total}
                method={paymentMethod}
              />
            ) : null}

            {type === 'Withdraw' && (
              <View>
                <View>
                  <View style={styles.subPrice}>
                    <SubtitleMedium style={styles.subPriceTitle}>
                      Sub total
                    </SubtitleMedium>
                    <SubtitleMedium
                      style={styles.subPriceTitle}>{`$${numberWithCommas(
                      Number(total).toFixed(2),
                    )}`}</SubtitleMedium>
                  </View>
                  <View style={styles.subPrice}>
                    <SubtitleMedium style={styles.subPriceTitle}>
                      Fee 10%
                    </SubtitleMedium>
                    <SubtitleMedium
                      style={styles.subPriceTitle}>{`$${numberWithCommas(
                      Number(+total * 0.1).toFixed(2),
                    )}`}</SubtitleMedium>
                  </View>
                </View>

                <View style={styles.price}>
                  <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
                  <TitleMedium style={styles.priceTitle}>{`$${numberWithCommas(
                    Number(total).toFixed(2),
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
                    ? navigation.navigate(Screens.sellBuyStack, {type: 'Buy'})
                    : type === 'Sell'
                    ? navigation.navigate(Screens.sellBuyStack, {type: 'Sell'})
                    : type === 'Fund'
                    ? navigation.navigate(Screens.fundWithdrawStack, {
                        type: 'Fund',
                      })
                    : type === 'Withdraw'
                    ? navigation.navigate(Screens.fundWithdrawStack, {
                        type: 'Withdraw',
                      })
                    : navigation.navigate(Screens.reedemStack)
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
