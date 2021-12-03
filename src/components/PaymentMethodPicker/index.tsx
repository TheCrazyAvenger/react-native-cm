import {CashBalance} from '@assets/images/settings';
import {
  EmptyPaymentMethod,
  ItemPicker,
  ModalWindow,
  PaymentMethodPickerProps,
} from '@components';
import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {useNavigation} from '@react-navigation/core';
import {setLoading} from '@store/slices/authSlice';
import {getCardImage, getPaymentImage} from '@utilities';
import React, {useState} from 'react';
import {View} from 'react-native';
import {PayPalForm} from '../../forms';
import {styles} from './styles';
import database from '@react-native-firebase/database';
import {addPaymentMethods} from '@store/slices/paymentMethodsSlice';
import {Subtitle, SubtitleMedium} from '@Typography';

export const PaymentMethodPicker: React.FC<PaymentMethodPickerProps> = ({
  onChange,
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
    //@ts-ignore
    Object.values(paymentMethods.creditCard)[0].cardType,
  );

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
        onConfirm={() =>
          navigation.navigate(Screens.paymentMethodsSetUp, {
            type: 'eCheck',
          })
        }
        onCancel={() => setVisibleModal(false)}
        visible={visibleModal}
      />
      <ItemPicker
        LeftIcon={getPaymentImage(paymentMethod)}
        label="Payment Method"
        style={styles.picker}
        placeholderStyle={styles.pickerPlaceholder}
        items={[
          {label: `Cash Balance ($${cashBalance})`, value: 'cashBalance'},
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
          <EmptyPaymentMethod title="Add Bank Wire" type="bankWire" />
        )}
      {paymentMethod === 'eCheck' &&
        paymentMethods[paymentMethod].length === 0 && (
          <EmptyPaymentMethod
            title="Link your bank account
        with Plaid"
            onPress={() => setVisibleModal(true)}
          />
        )}
      {paymentMethod === 'creditCard' &&
      paymentMethods[paymentMethod].length === 0 ? (
        <EmptyPaymentMethod title="Add a Credit/Debit Card" type="creditCard" />
      ) : (
        paymentMethod === 'creditCard' && (
          <ItemPicker
            labelStyle={{marginTop: 25}}
            LeftIcon={getCardImage(card)}
            label="Payment Method"
            style={styles.cardPicker}
            placeholderStyle={styles.pickerPlaceholder}
            items={paymentMethods.creditCard.map((item: any) => ({
              label: `Ending with ${item.cardNumber.slice(-4)}`,
              value: item.cardType,
            }))}
            maxHeight={150}
            value={card}
            onChange={value => {
              setCard(value);
            }}
          />
        )
      )}
      {paymentMethod === 'payPal' &&
      paymentMethods[paymentMethod].length === 0 ? (
        <PayPalForm
          onSubmit={onSubmit}
          style={{marginTop: 18}}
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
