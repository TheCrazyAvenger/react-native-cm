import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {TransactionsModal} from '../..';
import {Description, SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {TransactionItemProps} from 'src/components/PropTypes';
import {numberWithCommas} from '@utilities';

export const TransactonItem: React.FC<TransactionItemProps> = ({
  product,
  quantity,
  total,
  price_with_tax,
  type,
  shippingMethod,
  cart,
  spot,
  time,
  order,
  paymentMethod,
  ozPrice,
  oz,
  id,
  account,
  list,
  localeDate,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const containerStyle = [
    styles.container,
    id === 0 ? styles.topBorders : null,
    id === list.length - 1 ? styles.bottomBorders : null,
  ];

  return (
    <View>
      <TransactionsModal
        visible={modalVisible}
        date={localeDate}
        spot={spot}
        account={account}
        total={total}
        price_with_tax={price_with_tax}
        cart={cart}
        shippingMethod={shippingMethod}
        product={product}
        oz={oz}
        ozPrice={ozPrice}
        time={time}
        type={type}
        order={order}
        paymentMethod={paymentMethod}
        onPress={() => setModalVisible(false)}
      />
      <View style={[...containerStyle, style]}>
        <View style={styles.data}>
          {product ? (
            <View style={styles.transactionItem}>
              <Description style={styles.transactionTitle}>Product</Description>
              <SubtitleMedium>{product}</SubtitleMedium>
            </View>
          ) : null}
          {quantity ? (
            <View style={styles.transactionItem}>
              <Description style={styles.transactionTitle}>
                Quantity
              </Description>
              <SubtitleMedium>
                {numberWithCommas(Number(quantity).toFixed(3))} oz
              </SubtitleMedium>
            </View>
          ) : null}
          <View style={styles.transactionItem}>
            <Description style={styles.transactionTitle}>Total</Description>
            <SubtitleMedium>
              {`$${numberWithCommas(Number(total).toFixed(2))}`}
            </SubtitleMedium>
          </View>
          <View style={styles.transactionItem}>
            <Description style={styles.transactionTitle}>
              Type of Transaction
            </Description>
            <SubtitleMedium>{type}</SubtitleMedium>
          </View>
          <View style={styles.transactionItem}>
            <Description style={styles.transactionTitle}>Order</Description>
            <SubtitleMedium style={styles.order}>{order}</SubtitleMedium>
          </View>
          <View style={styles.transactionItem}>
            <Description style={styles.transactionTitle}>Date</Description>
            <SubtitleMedium>{localeDate}</SubtitleMedium>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}>
          <SubtitleMedium style={styles.moreButton}>Show More</SubtitleMedium>
        </TouchableOpacity>
      </View>
    </View>
  );
};
