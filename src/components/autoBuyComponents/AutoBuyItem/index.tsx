import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {AutoBuyItemProps, ModalWindow} from '../..';
import {Delete, Edit} from '../../../assets/images/settings';
import {colors, Screens} from '../../../constants';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {deleteAutoBuy} from '../../../store/slices/autoBuySlice';
import {Description, SubtitleMedium} from '../../Typography';
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
}) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const navigation: any = useNavigation();

  const autoBuy = useAppSelector(state => state.autoBuy.autoBuy);

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
        onConfirm={() => dispatch(deleteAutoBuy(id))}
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
              <Description style={{color: colors.gray, marginBottom: 4}}>
                End Date
              </Description>
              <SubtitleMedium>{endDate}</SubtitleMedium>
            </View>
          ) : null}
        </View>

        <View>
          <Description style={{color: colors.gray, marginBottom: 4}}>
            Status
          </Description>
          <SubtitleMedium>Active</SubtitleMedium>
        </View>
      </View>
    </>
  );
};
