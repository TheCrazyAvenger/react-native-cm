import React from 'react';
import {View} from 'react-native';
import {AutoBuyInfoProps, Wrapper} from '../..';
import {colors} from '@constants';
import {Description, SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {getPaymentName, numberWithCommas} from '@utilities';

export const AutoBuyInfo: React.FC<AutoBuyInfoProps> = ({
  metal,
  amount,
  frequency,
  paymentMethod,
  startDate,
  endDate,
  usedAmount,
  account,
  style,
}) => {
  return (
    <View style={style}>
      <View style={styles.reviewItem}>
        <View style={styles.reviewInfo}>
          <Description style={styles.reviewTitle}>Buying</Description>
          <SubtitleMedium style={styles.reviewText}>{metal}</SubtitleMedium>
        </View>
        <View style={styles.reviewInfo}>
          <Description style={styles.reviewTitle}>Amount</Description>
          <SubtitleMedium style={styles.reviewText}>
            {usedAmount === 'USD'
              ? `$${numberWithCommas(Number(amount).toFixed(2))}`
              : `${numberWithCommas(Number(amount).toFixed(3))} oz`}
          </SubtitleMedium>
        </View>
        <View style={styles.reviewInfo}>
          <Description style={styles.reviewTitle}>Payment Method</Description>
          <SubtitleMedium style={styles.reviewText}>
            {getPaymentName(paymentMethod)}
          </SubtitleMedium>
        </View>
        {account !== '' && account !== undefined && (
          <View style={styles.reviewInfo}>
            <Description style={styles.reviewTitle}>Account</Description>
            <SubtitleMedium style={styles.reviewText}>{account}</SubtitleMedium>
          </View>
        )}
      </View>
      <Wrapper
        style={{
          backgroundColor: colors.primary,
          marginTop: 0,
          marginBottom: 20,
        }}
      />
      <View style={styles.reviewItem}>
        <View style={styles.reviewInfo}>
          <Description style={styles.reviewTitle}>Start Date</Description>
          <SubtitleMedium style={styles.reviewText}>{startDate}</SubtitleMedium>
        </View>
        {endDate && (
          <View style={styles.reviewInfo}>
            <Description style={styles.reviewTitle}>End Date</Description>
            <SubtitleMedium style={styles.reviewText}>{endDate}</SubtitleMedium>
          </View>
        )}
        <View style={styles.reviewInfo}>
          <Description style={styles.reviewTitle}>Frequency</Description>
          <SubtitleMedium style={styles.reviewText}>{frequency}</SubtitleMedium>
        </View>
      </View>
      <View style={{marginBottom: 24}}>
        <SubtitleMedium style={{color: colors.gray}}>
          The price provided is an estimate only. The actual price charged will
          be based on CyberMetals’ spot price and premium for each product at
          the time the order is executed. All transactions will be executed
          between 5:00 p.m. EST and 6:00 p.m. EST on the day your Auto Buy is
          scheduled.
        </SubtitleMedium>
      </View>
    </View>
  );
};
