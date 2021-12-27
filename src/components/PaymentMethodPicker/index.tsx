import {
  EmptyPaymentMethod,
  ItemPicker,
  ModalWindow,
  PaymentMethodPickerProps,
} from '@components';
import {Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useNavigation} from '@react-navigation/core';
import {setLoading} from '@store/slices/authSlice';
import {getPaymentImage, numberWithCommas} from '@utilities';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {PayPalForm} from '../../forms';
import {styles} from './styles';
import database from '@react-native-firebase/database';
import {addPaymentMethods} from '@store/slices/paymentMethodsSlice';
import {SubtitleMedium} from '@Typography';

export const PaymentMethodPicker: React.FC<PaymentMethodPickerProps> = ({
  onChange,
  label,
  labelStyle,
  containerStyle,
  setPaymentType,
  accountStyle,
}) => {
  const navigation: any = useNavigation();

  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );
  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();

  const [paymentMethod, setPaymentMethod] = useState('cashBalance');
  const [visibleModal, setVisibleModal] = useState(false);

  const [card, setCard] = useState(
    paymentMethods.creditCard.length > 0
      ? paymentMethods.creditCard[0].fullName
      : '',
  );
  const [bankWire, setBankWire] = useState(
    paymentMethods.bankWire.length > 0
      ? paymentMethods.bankWire[0].fullName
      : '',
  );
  const [eCheck, setEcheck] = useState(
    paymentMethods.eCheck.length > 0 ? paymentMethods.eCheck[0].fullName : '',
  );

  let creditCardsLength = 0;

  const creditCards = paymentMethods.creditCard.filter((item: any) =>
    new Date('01/' + item.expirationDate) > new Date() ? true : false,
  );

  paymentMethods.creditCard.length > 0 &&
    paymentMethods.creditCard.map(
      (item: any) =>
        new Date('01/' + item.expirationDate) > new Date() &&
        creditCardsLength++,
    );

  useEffect(() => {
    paymentMethods.creditCard.length > 0 &&
      creditCards.length > 0 &&
      setCard(creditCards[0].fullName);
    paymentMethods.bankWire.length > 0 &&
      setBankWire(paymentMethods.bankWire[0].fullName);
    paymentMethods.eCheck.length > 0 &&
      setEcheck(paymentMethods.eCheck[0].fullName);

    setPaymentType(
      paymentMethod === 'creditCard' && creditCardsLength === 0
        ? ''
        : paymentMethod === 'creditCard' &&
          creditCardsLength > 0 &&
          paymentMethods[paymentMethod].length > 0 &&
          creditCards.length > 0
        ? creditCards[0].fullName
        : paymentMethods[paymentMethod].length > 0
        ? paymentMethods[paymentMethod][0].fullName
        : '',
    );
  }, [paymentMethods]);

  useEffect(() => {
    setPaymentType(
      paymentMethods.payPal.length > 0 && paymentMethod === 'payPal'
        ? paymentMethods.payPal[0].cardNumber
        : paymentMethod === 'creditCard' && creditCardsLength === 0
        ? ''
        : paymentMethod === 'creditCard' &&
          creditCardsLength > 0 &&
          paymentMethods[paymentMethod].length > 0 &&
          creditCards.length > 0
        ? creditCards[0].fullName
        : paymentMethods[paymentMethod].length > 0
        ? paymentMethods[paymentMethod][0].fullName
        : '',
    );
  }, [paymentMethod]);

  const onSubmit = async (values: any) => {
    dispatch(setLoading(true));
    const {paymentMethod} = values;
    const id = `${Math.round(Math.random() * 1000000)}_${paymentMethod}`;
    await database()
      .ref(`/users/${token}/paymentMethods/${id}`)
      .set({...values, id});
    await dispatch(addPaymentMethods({...values, id}));
    await dispatch(setLoading(false));
  };

  return (
    <View>
      <ModalWindow
        title="Add a Bank  Account"
        text="CyberMetals uses Plaid to securely link to your bank account. When you
        log into Plaid, we receive Identifiers, Contact Information, Financial Information, and Technical Information from Plaid, which we use, process, and store as described in our Privacy Policy."
        confirmTitle="Log In to Your
        Online Checking Account"
        cancelTitle="Cancel"
        onConfirm={() => {
          setVisibleModal(false);
          navigation.navigate(Screens.paymentMethodsSetUp, {
            type: 'eCheck',
          });
        }}
        onCancel={() => setVisibleModal(false)}
        visible={visibleModal}
      />
      <ItemPicker
        LeftIcon={getPaymentImage(paymentMethod)}
        label={label}
        labelStyle={labelStyle}
        textStyle={{fontFamily: 'OpenSans-SemiBold'}}
        style={{...styles.picker, ...containerStyle}}
        placeholderStyle={styles.pickerPlaceholder}
        items={[
          {
            label: `Cash Balance ($${numberWithCommas(
              Number(cashBalance).toFixed(2),
            )})`,
            value: 'cashBalance',
          },
          {label: 'Credit/Debit Card', value: 'creditCard'},
          {label: 'Bank Wire', value: 'bankWire'},
          {label: 'PayPal', value: 'payPal'},
          {label: 'ACH/eCheck', value: 'eCheck'},
        ]}
        value={paymentMethod}
        onChange={value => {
          setPaymentMethod(value);
          onChange(value);
        }}
      />

      {paymentMethod === 'bankWire' &&
        paymentMethods[paymentMethod].length === 0 && (
          <EmptyPaymentMethod
            style={accountStyle}
            title="Add Bank Wire"
            type="bankWire"
          />
        )}
      {paymentMethod === 'eCheck' &&
        paymentMethods[paymentMethod].length === 0 && (
          <EmptyPaymentMethod
            style={accountStyle}
            title="Link your bank account
        with Plaid"
            onPress={() => setVisibleModal(true)}
          />
        )}
      {(paymentMethod === 'creditCard' &&
        paymentMethods[paymentMethod].length === 0) ||
      (paymentMethod === 'creditCard' && creditCardsLength === 0) ? (
        <EmptyPaymentMethod
          style={accountStyle}
          title="Add a Credit/Debit Card"
          type="creditCard"
        />
      ) : null}
      {((paymentMethod === 'creditCard' && creditCardsLength > 0) ||
        paymentMethod === 'eCheck' ||
        paymentMethod === 'bankWire') &&
      paymentMethods[paymentMethod].length > 0 ? (
        <ItemPicker
          labelStyle={{marginTop: 25, ...labelStyle}}
          label="Account"
          style={{...styles.cardPicker, ...containerStyle}}
          placeholderStyle={styles.pickerPlaceholder}
          items={paymentMethods[paymentMethod]
            .filter((item: any) =>
              new Date('01/' + item.expirationDate) > new Date() &&
              creditCardsLength > 0
                ? true
                : paymentMethod !== 'creditCard'
                ? true
                : false,
            )
            .map((item: any) => ({
              label: item.fullName,
              value: item.fullName,
            }))}
          textStyle={{
            fontSize:
              paymentMethod === 'eCheck' || paymentMethod === 'bankWire'
                ? 13
                : 16,
          }}
          maxHeight={150}
          value={
            paymentMethod === 'creditCard'
              ? card
              : paymentMethod === 'bankWire'
              ? bankWire
              : eCheck
          }
          onChange={value => {
            paymentMethod === 'creditCard'
              ? setCard(value)
              : paymentMethod === 'bankWire'
              ? setBankWire(value)
              : setEcheck(value);

            setPaymentType(value);
          }}
        />
      ) : null}
      {paymentMethod === 'payPal' &&
      paymentMethods[paymentMethod].length === 0 ? (
        <PayPalForm
          onSubmit={onSubmit}
          style={{marginTop: 18, ...containerStyle}}
          labelStyle={{marginBottom: 0}}
          type="payPal"
          label="PayPal"
          screen="Buy"
        />
      ) : (
        paymentMethod === 'payPal' && (
          <View style={{marginTop: 20}}>
            <SubtitleMedium style={styles.title}>Account</SubtitleMedium>
            <SubtitleMedium style={styles.paypal}>
              {paymentMethods.payPal[0].cardNumber}
            </SubtitleMedium>
          </View>
        )
      )}
    </View>
  );
};
