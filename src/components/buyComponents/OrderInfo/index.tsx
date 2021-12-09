import React from 'react';
import {View} from 'react-native';
import {OrderInfoProps} from '../..';
import {Description, SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {colors} from '@constants';

export const OrderInfo: React.FC<OrderInfoProps> = ({
  order,
  date: orderDate,
  time,
  status,
  style,
}) => {
  const date = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return (
    <View>
      <View style={{...styles.info, ...style}}>
        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>Order</Description>
          <SubtitleMedium
            style={{
              ...styles.orederText,
              color: status === 'Error' ? colors.black : colors.primary,
            }}>
            {order}
          </SubtitleMedium>
        </View>
        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>Order Date</Description>

          {orderDate ? (
            <SubtitleMedium style={styles.infoText}>{orderDate}</SubtitleMedium>
          ) : (
            <SubtitleMedium style={styles.infoText}>
              {date.toLocaleDateString()}
            </SubtitleMedium>
          )}
        </View>
        {status !== 'Error' && (
          <View style={styles.infoItem}>
            <Description style={styles.infoTitle}>Time</Description>
            {time ? (
              <SubtitleMedium style={styles.infoText}>{time}</SubtitleMedium>
            ) : (
              <SubtitleMedium style={styles.infoText}>
                {hours}:{minutes < 10 ? `0${minutes}` : minutes}
              </SubtitleMedium>
            )}
          </View>
        )}

        <View style={styles.infoItem}>
          <Description style={styles.infoTitle}>Order Status</Description>
          <SubtitleMedium style={styles.infoText}>{status}</SubtitleMedium>
        </View>
      </View>
    </View>
  );
};
