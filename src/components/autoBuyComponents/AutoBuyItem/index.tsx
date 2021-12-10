import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AutoBuyItemProps, ModalWindow} from '../..';
import {Delete, Edit, Warning} from '@assets/images/settings';
import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
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
  }, []);

  const dispatch = useAppDispatch();

  const containerStyle = [
    styles.container,
    id === 0 ? styles.topBorders : null,
    id === autoBuy.length - 1 ? styles.bottomBorders : null,
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
        <View style={styles.cardHeader}>
          <View style={styles.cardItem}>
            <View style={{marginRight: 36}}>
              <Description style={{color: colors.gray, marginBottom: 4}}>
                Product
              </Description>
              <SubtitleMedium>{metal}</SubtitleMedium>
            </View>
            <View>
              <Description style={{color: colors.gray, marginBottom: 4}}>
                Amount
              </Description>
              <SubtitleMedium>{`$${numberWithCommas(
                Number(amount).toFixed(2),
              )}`}</SubtitleMedium>
            </View>
          </View>
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
        </View>
        <View style={styles.cardItem}>
          <View style={{marginRight: 36}}>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Frequency
            </Description>
            <SubtitleMedium>{frequency}</SubtitleMedium>
          </View>
          <View>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Payment Method
            </Description>
            <SubtitleMedium>{getPaymentName(paymentMethod)}</SubtitleMedium>
          </View>
        </View>

        <View style={styles.cardItem}>
          <View style={{marginRight: 36}}>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Start Date
            </Description>
            <SubtitleMedium>{startDate}</SubtitleMedium>
          </View>
          {endDate ? (
            <View>
              <View style={styles.row}>
                <Description
                  style={{color: colors.gray, marginBottom: 4, marginRight: 5}}>
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
          <Description style={{color: colors.gray, marginBottom: 4}}>
            Status
          </Description>
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
    </>
  );
};
