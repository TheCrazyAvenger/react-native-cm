import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar, TouchableOpacity, View} from 'react-native';
import {CheckBoxItem, ModalWindow, ReedemInfo, TaxItem} from '@components';
import {SubtitleMedium, TitleMedium} from '@Typography';
import {useAppDispatch, useAppSelector} from '@hooks';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import {getPaymentName, getTime} from '@utilities';
import {updateCash} from '@store/slices/authSlice';
import database from '@react-native-firebase/database';
import {addOperation} from '@store/slices/operationsSlice';
import {Screens} from '@constants';
import {cleanCart} from '@store/slices/reedemSlice';

export const ReviewReedem: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [loading, setLoading] = useState(false);
  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const token = useAppSelector(state => state.auth.token);

  const [checkBox, setCheckbox] = useState(false);

  let myInterval: any = null;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [modalVisble, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: 'Redeeming Confirmation',
    });
  }, []);

  useEffect(() => {
    myInterval = setInterval(() => {
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

  const dispatch = useAppDispatch();

  const {paymentMethod, shippingMethod, amount, cart, account} = route.params;

  const reedemHandler = async () => {
    try {
      const order = Math.round(Math.random() * (10000 - 1) + 1);
      const date = new Date();
      const {month, monthName, day, year, hours, minutes} = getTime(date);

      const id = `${Math.round(Math.random() * 1000000)}_reedem`;

      const data = {
        title: `Redeemed Products`,
        type: 'Reedem',
        localeDate: `${month}/${day}/${year}`,
        date: `${monthName} ${day}, ${year}`,
        time: `${hours}:${minutes < 10 ? '0' + minutes : minutes}`,
        total: amount,
        usd: `- $${amount}`,
        cart,
        account,
        shippingMethod,
        paymentMethod: getPaymentName(paymentMethod),
        order,
        image: `redeem`,
        id,
      };

      setLoading(true);

      await database().ref(`/users/${token}/operations/${id}`).set(data);

      await dispatch(addOperation(data));

      const newCashValue =
        paymentMethod === 'cashBalance' ? cashBalance - +amount : cashBalance;

      await database()
        .ref(`/users/${token}`)
        .update({cashBalance: newCashValue});
      await dispatch(updateCash(newCashValue));

      await setLoading(false);

      await clearInterval(myInterval);

      await dispatch(cleanCart());

      navigation.replace(Screens.completeReedem, {
        paymentMethod,
        shippingMethod,
        cart,
        order,
        account,
        amount,
        type: 'Success',
      });
    } catch (e) {
      await setLoading(false);
      clearInterval(myInterval);
      navigation.replace(Screens.completeReedem, {
        paymentMethod,
        shippingMethod,
        cart,
        order: '-',
        account,
        amount,
        type: 'Error',
      });

      console.log(e);
    }
  };

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
        <TitleMedium numberOfLines={1} style={styles.timer}>
          Your pricing is locked for: {minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </TitleMedium>
      </View>

      <View style={styles.container}>
        <TitleMedium style={styles.title}>You are Redeeming</TitleMedium>

        <ReedemInfo
          paymentMethod={paymentMethod}
          shippingMethod={shippingMethod}
          cart={cart}
          account={account}
        />

        <TaxItem
          style={{marginTop: 0}}
          subtotal={0}
          salesTax={0}
          shippingFee={shippingMethod}
          shippingTax={0}
          total={amount}
        />

        <CheckBoxItem
          value={checkBox}
          style={{marginLeft: 0}}
          onPress={() => setCheckbox(value => !value)}>
          <View style={{marginBottom: 12, width: '90%'}}>
            <SubtitleMedium>I agree with the CyberMetals</SubtitleMedium>
            <TouchableOpacity>
              <SubtitleMedium style={styles.termsText}>
                Terms and Conditions.
              </SubtitleMedium>
            </TouchableOpacity>
          </View>
        </CheckBoxItem>

        <View>
          <TextButton
            solid
            changeDisabledStyle={true}
            disabledStyle={{
              backgroundColor: cashBalance < +amount ? '#F39A9A' : '#C1D9FA',
            }}
            disabledTitle={cashBalance < +amount ? 'Insufficient Funds' : null}
            loading={loading}
            disabled={checkBox === false || loading || cashBalance < +amount}
            style={{marginBottom: 20}}
            title="Confirm Redemption"
            onPress={reedemHandler}
          />
          <TextButton
            title="Cancel"
            style={{marginBottom: 5}}
            onPress={() => navigation.pop(2)}
          />
        </View>
      </View>
    </Screen>
  );
};
