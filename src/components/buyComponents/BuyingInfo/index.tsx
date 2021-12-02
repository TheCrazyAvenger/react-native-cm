import React from 'react';
import {View} from 'react-native';
import {BuyingInfoProps} from '../..';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
import {styles} from './styles';

export const BuyingInfo: React.FC<BuyingInfoProps> = ({
  metal,
  spot,
  amountOz,
  paymentMethod,
  amount,
  style,
}) => {
  return (
    <View style={style}>
      <View style={styles.info}>
        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>Buying</Description>
          <SubtitleMedium style={styles.infoText}>{metal}</SubtitleMedium>
        </View>
        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>Spot</Description>
          <SubtitleMedium style={styles.infoText}>$ {spot}/oz</SubtitleMedium>
        </View>
        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>Amount</Description>
          <SubtitleMedium style={styles.infoText}>
            {amountOz} oz of {metal} at {spot}$
          </SubtitleMedium>
        </View>

        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>Payment Methods</Description>
          <SubtitleMedium style={styles.infoText}>
            {paymentMethod}
          </SubtitleMedium>
        </View>
      </View>
      <View style={styles.price}>
        <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
        <TitleMedium style={styles.priceTitle}>{`$${amount}`}</TitleMedium>
      </View>
    </View>
  );
};
