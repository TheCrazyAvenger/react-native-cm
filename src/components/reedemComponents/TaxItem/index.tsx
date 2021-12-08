import {TaxItemProps} from '@components';
import {SubtitleMedium, TitleMedium} from '@Typography';
import {numberWithCommas} from '@utilities';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const TaxItem: React.FC<TaxItemProps> = ({
  style,
  subtotal,
  salesTax,
  shippingFee,
  shippingTax,
  total,
}) => {
  return (
    <View>
      <View style={{marginTop: 25, ...style}}>
        <View style={styles.taxItem}>
          <SubtitleMedium style={styles.taxText}>Subtotal</SubtitleMedium>
          <SubtitleMedium style={styles.taxText}>{`$${numberWithCommas(
            Number(subtotal).toFixed(2),
          )}`}</SubtitleMedium>
        </View>
        <View style={styles.taxItem}>
          <SubtitleMedium style={styles.taxText}>Sales Tax</SubtitleMedium>
          <SubtitleMedium style={styles.taxText}>{`$${numberWithCommas(
            Number(salesTax).toFixed(2),
          )}`}</SubtitleMedium>
        </View>
        <View style={styles.taxItem}>
          <SubtitleMedium style={styles.taxText}>Shipping Fee</SubtitleMedium>
          <SubtitleMedium style={styles.taxText}>{`$${
            shippingFee.split(' ')[1]
          }`}</SubtitleMedium>
        </View>
        <View style={styles.taxItem}>
          <SubtitleMedium style={styles.taxText}>Shipping Tax</SubtitleMedium>
          <SubtitleMedium style={styles.taxText}>{`$${numberWithCommas(
            Number(shippingTax).toFixed(2),
          )}`}</SubtitleMedium>
        </View>
      </View>
      <View style={styles.price}>
        <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
        <TitleMedium style={styles.priceTitle}>{`$${
          total !== 0
            ? numberWithCommas(
                Number(total + +shippingFee.split(' ')[1]).toFixed(2),
              )
            : 0
        }`}</TitleMedium>
      </View>
    </View>
  );
};
