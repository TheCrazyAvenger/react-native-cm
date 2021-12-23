import React from 'react';
import {View} from 'react-native';
import {SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {numberWithCommas} from '@utilities';
import {WithdrawTaxItemProps} from '@components';

export const WithdrawTaxItem: React.FC<WithdrawTaxItemProps> = ({
  amount,
  style,
}) => {
  return (
    <View style={{paddingHorizontal: 10, marginTop: 30, ...style}}>
      <View style={styles.subPrice}>
        <SubtitleMedium style={styles.subPriceTitle}>Sub total</SubtitleMedium>
        <SubtitleMedium style={styles.subPriceTitle}>{`$${numberWithCommas(
          Number(amount).toFixed(2),
        )}`}</SubtitleMedium>
      </View>
      <View style={styles.subPrice}>
        <SubtitleMedium style={styles.subPriceTitle}>Fee 10%</SubtitleMedium>
        <SubtitleMedium style={styles.subPriceTitle}>{`$${numberWithCommas(
          Number(+amount * 0.1).toFixed(2),
        )}`}</SubtitleMedium>
      </View>
    </View>
  );
};
