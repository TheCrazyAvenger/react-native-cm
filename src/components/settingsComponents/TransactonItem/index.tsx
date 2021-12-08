import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AutoBuyItemProps, ModalWindow} from '../..';
import {Delete, Edit, Warning} from '@assets/images/settings';
import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {Description, Illustration, SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {TransactionItemProps} from 'src/components/PropTypes';
import {getTime, numberWithCommas} from '@utilities';

export const TransactonItem: React.FC<TransactionItemProps> = ({
  product,
  quantity,
  total,
  type,
  date,
  id,
  list,
  onPress,
  style,
}) => {
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();
  const operations = useAppSelector(state => state.operations.operations);

  const transactionType =
    type.split('_')[1].charAt(0).toUpperCase() + type.split('_')[1].slice(1);

  const {month, year, day} = getTime(date);

  const containerStyle = [
    styles.container,
    id === 0 ? styles.topBorders : null,
    id === list.length - 1 ? styles.bottomBorders : null,
  ];

  return (
    <View style={[...containerStyle, style]}>
      <View style={styles.data}>
        {product.split(' ')[0] === 'Bought' ||
        product.split(' ')[0] === 'Sold' ? (
          <View style={styles.transactionItem}>
            <Description style={styles.transactionTitle}>Product</Description>
            <SubtitleMedium>{product.split(' ')[1]}</SubtitleMedium>
          </View>
        ) : null}
        {quantity ? (
          <View style={styles.transactionItem}>
            <Description style={styles.transactionTitle}>Quantity</Description>
            <SubtitleMedium>
              {numberWithCommas(Number(quantity).toFixed(3))} oz
            </SubtitleMedium>
          </View>
        ) : null}
        <View style={styles.transactionItem}>
          <Description style={styles.transactionTitle}>Total</Description>
          <SubtitleMedium>
            {`$${numberWithCommas(Number(total.split('$')[1]).toFixed(2))}`}
          </SubtitleMedium>
        </View>
        <View style={styles.transactionItem}>
          <Description style={styles.transactionTitle}>
            Type of Transaction
          </Description>
          <SubtitleMedium>{transactionType}</SubtitleMedium>
        </View>
        <View style={styles.transactionItem}>
          <Description style={styles.transactionTitle}>Date</Description>
          <SubtitleMedium>{`${month}/${day}/${year}`}</SubtitleMedium>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <SubtitleMedium style={styles.moreButton}>Show More</SubtitleMedium>
      </TouchableOpacity>
    </View>
  );
};
