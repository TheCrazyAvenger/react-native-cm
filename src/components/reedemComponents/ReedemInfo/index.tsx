import React from 'react';
import {View} from 'react-native';
import {ReedemInfoProps} from '../..';
import {Description, SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {getPaymentName, getShippingName} from '@utilities';

export const ReedemInfo: React.FC<ReedemInfoProps> = ({
  paymentMethod,
  cart,
  shippingMethod,
  style,
}) => {
  return (
    <View style={style}>
      <View style={{marginBottom: 10}}>
        <View style={styles.cart}>
          <Description>Redeeming</Description>
          <Description>Quantity</Description>
        </View>
        {cart.map((item: any) => (
          <View key={item.name} style={{...styles.cart, marginTop: 4}}>
            <SubtitleMedium style={styles.cartName}>{item.name}</SubtitleMedium>
            <SubtitleMedium>{item.qty}</SubtitleMedium>
          </View>
        ))}
      </View>
      <View style={{...styles.info, ...style}}>
        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>Payment Method</Description>
          <SubtitleMedium style={styles.infoText}>
            {getPaymentName(paymentMethod)}
          </SubtitleMedium>
        </View>

        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>Shipping Method</Description>
          <SubtitleMedium style={styles.infoText}>
            {getShippingName(shippingMethod.split(' ')[0])}
          </SubtitleMedium>
        </View>
      </View>
    </View>
  );
};