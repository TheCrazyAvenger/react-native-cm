import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AutoBuyItemProps, ModalWindow} from '../..';
import {Delete, Edit, Warning} from '@assets/images/settings';
import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {Description, Illustration, SubtitleMedium} from '@Typography';
import {styles} from './styles';

export const AutoBuyItem: React.FC<AutoBuyItemProps> = ({
  metal,
  amount,
  frequency,
  paymentMethod,
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
    id === 1 ? styles.topBorders : null,
    id === autoBuy.length ? styles.bottomBorders : null,
  ];

  const goToEdit = () => {
    navigation.navigate(Screens.autoBuySetUp, {
      type: 'edit',
      prevValues: {
        amount,
        metal,
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
              <SubtitleMedium>$ {amount}</SubtitleMedium>
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
            <SubtitleMedium>{paymentMethod}</SubtitleMedium>
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
          <SubtitleMedium>{isExpiried ? 'Inactive' : 'Active'}</SubtitleMedium>
        </View>
      </View>
    </>
  );
};
