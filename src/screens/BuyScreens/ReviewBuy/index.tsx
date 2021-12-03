import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import {BuyingInfo, LoadingItem, ModalWindow} from '@components';
import {TitleMedium} from '@Typography';
import {useAppDispatch, useAppSelector} from '@hooks';
import {Screen} from '@ui';
import {styles} from './styles';
import {ReviewBuyForm} from '../../../forms';
import {getPaymentName} from '@utilities';

export const ReviewBuy: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const loading = useAppSelector(state => state.auth.loading);
  const token = useAppSelector(state => state.auth.token);

  const [modalVisble, setModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  const {amountOz, paymentMethod, amount, data} = route.params;
  const {metal, spot} = data;

  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setModalVisible(true);
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <ModalWindow
        title="Timer has Expired"
        text="The 3:00 timer has expired. Please click “Update” to refresh the page with updated pricing."
        visible={modalVisble}
        confirmTitle="Update"
        onConfirm={() => {
          setMinutes(3);
          setSeconds(0);
          setModalVisible(false);
        }}
      />
      <View>
        <TitleMedium style={styles.timer}>
          Your pricing is locked for: {minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </TitleMedium>
      </View>
      <View style={styles.container}>
        <TitleMedium style={styles.title}>You are Buying</TitleMedium>

        <BuyingInfo
          metal={metal}
          amount={amount}
          spot={spot}
          amountOz={amountOz}
          paymentMethod={getPaymentName(paymentMethod)}
        />

        <ReviewBuyForm />
      </View>
    </Screen>
  );
};
