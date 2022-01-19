import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AutoBuyItemProps, ModalWindow} from '../..';
import {Delete, Edit, Warning} from '@assets/images/settings';
import {colors, Screens} from '@constants';
import {useAppSelector} from '@hooks';
import {Description, Illustration, SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {getPaymentName, numberWithCommas} from '@utilities';
import {Info} from '@assets/images/buy';
import {Tooltip} from 'react-native-elements';

export const AutoBuyItem: React.FC<AutoBuyItemProps> = ({
  metal,
  amount,
  frequency,
  paymentMethod,
  status,
  startDate,
  endDate,
  style,
  id,
  account,
  keyId,
  usedAmount,
  onRemove,
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const navigation: any = useNavigation();
  const [isExpiried, setIsExpiried] = useState(false);

  const autoBuy = useAppSelector(state => state.autoBuy.autoBuy);

  useEffect(() => {
    if (endDate) {
      const today = new Date();
      const expiringDate = new Date(endDate);
      if (today > expiringDate) setIsExpiried(true);
    }
  }, [endDate]);

  const containerStyle = [
    styles.container,
    keyId === 0 ? styles.topBorders : null,
    keyId === autoBuy.length - 1 ? styles.bottomBorders : null,
  ];

  const goToEdit = () => {
    navigation.navigate(Screens.autoBuySetUp, {
      type: 'edit',
      prevValues: {
        amount,
        metal,
        status,
        frequency,
        paymentMethod,
        startDate,
        endDate,
        usedAmount,
        account,
        id,
      },
    });
  };

  return (
    <>
      <ModalWindow
        title="Cancel Auto Buy"
        text="Are you sure you want to cancel this Auto Buy transaction?"
        confirmTitle="Yes, cancel"
        cancelTitle="No, keep it"
        onConfirm={() => onRemove(id)}
        onCancel={() => setVisibleModal(false)}
        visible={visibleModal}
      />

      <View style={[...containerStyle, style]}>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={goToEdit}>
            <Edit />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 15}}
            onPress={() => setVisibleModal(true)}>
            <Delete />
          </TouchableOpacity>
        </View>

        <View style={styles.cardHeader}>
          <View style={styles.cardItem}>
            <Description style={styles.cardTitle}>Product</Description>
            <SubtitleMedium>{metal}</SubtitleMedium>
          </View>

          <View style={styles.cardItem}>
            <Description style={styles.cardTitle}>Amount</Description>
            <SubtitleMedium>
              {usedAmount === 'USD' || usedAmount === undefined
                ? `$${numberWithCommas(Number(amount).toFixed(2))}`
                : `${numberWithCommas(Number(amount).toFixed(3))} oz`}
            </SubtitleMedium>
          </View>

          <View style={styles.cardItem}>
            <Description style={styles.cardTitle}>Frequency</Description>
            <SubtitleMedium>{frequency}</SubtitleMedium>
          </View>

          <View style={styles.cardItem}>
            <Description style={styles.cardTitle}>Payment Method</Description>
            <SubtitleMedium>{getPaymentName(paymentMethod)}</SubtitleMedium>
          </View>

          {account !== '' && account !== undefined && (
            <View style={styles.cardItem}>
              <Description style={styles.cardTitle}>Account</Description>
              <SubtitleMedium>{account}</SubtitleMedium>
            </View>
          )}

          <View style={styles.cardItem}>
            <Description style={styles.cardTitle}>Start Date</Description>
            <SubtitleMedium>{startDate}</SubtitleMedium>
          </View>
          <View style={styles.cardItem}>
            {endDate ? (
              <View>
                <View style={styles.row}>
                  <Description
                    style={{
                      ...styles.cardTitle,
                      marginRight: 5,
                    }}>
                    End Date
                  </Description>
                  {isExpiried && <Warning />}
                </View>
                <View style={styles.row}>
                  <SubtitleMedium style={{marginRight: 5}}>
                    {endDate}
                  </SubtitleMedium>
                  {isExpiried && (
                    <Illustration style={{color: colors.red}}>
                      Has expired
                    </Illustration>
                  )}
                </View>
              </View>
            ) : null}
          </View>

          <View>
            <Description style={styles.cardTitle}>Status</Description>
            <View style={styles.row}>
              <SubtitleMedium style={{marginRight: 5}}>
                {isExpiried ? 'Inactive' : status}
              </SubtitleMedium>
              {/* 
             //@ts-ignore*/}
              <Tooltip
                withPointer={false}
                containerStyle={{...styles.tooltip, width: 200}}
                backgroundColor={colors.white}
                popover={
                  <Description>
                    {isExpiried
                      ? 'This Auto Buy has reached its end date. Please extend the end date or set up a new Auto Buy.'
                      : status === 'Active'
                      ? 'This is an active Auto Buy that will make automatic purchases based on the selected schedule.'
                      : 'This Auto Buy is on hold. Choose Active in the dropdown menu to resume automatic purchases.'}
                  </Description>
                }>
                <Info />
              </Tooltip>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
