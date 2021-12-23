import React from 'react';
import {View} from 'react-native';
import {BuyingInfoProps} from '../..';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {numberWithCommas} from '@utilities';

export const BuyingInfo: React.FC<BuyingInfoProps> = ({
  metal,
  spot,
  amountOz,
  paymentMethod,
  amount,
  style,
  type,
  account,
}) => {
  return (
    <View>
      <View style={{...styles.info, ...style}}>
        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>
            {type === 'Buy' ? 'Buying' : 'Selling'}
          </Description>
          <SubtitleMedium style={styles.infoText}>{metal}</SubtitleMedium>
        </View>
        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>Spot</Description>
          <SubtitleMedium
            style={styles.infoText}>{`$${spot}/oz`}</SubtitleMedium>
        </View>
        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>Amount</Description>
          <SubtitleMedium style={styles.infoText}>
            {`${amountOz} oz of ${metal} at $${spot}`}
          </SubtitleMedium>
        </View>

        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>
            {type === 'Buy' ? 'Payment Methods' : 'Deposit To'}
          </Description>
          <SubtitleMedium style={styles.infoText}>
            {paymentMethod}
          </SubtitleMedium>
        </View>
        {account && paymentMethod !== 'Cash Balance' ? (
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>Account</Description>
            <SubtitleMedium style={styles.account}>{account}</SubtitleMedium>
          </View>
        ) : null}
      </View>
      <View style={styles.price}>
        <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
        <TitleMedium style={styles.priceTitle}>{`$${numberWithCommas(
          Number(amount).toFixed(2),
        )}`}</TitleMedium>
      </View>
    </View>
  );
};
