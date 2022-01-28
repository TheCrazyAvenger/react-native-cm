import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {FormInput, ItemPicker, PaymentMethodPicker} from '@components';
import {Description, SubtitleMedium, TitleMedium, Error} from '@Typography';
import {TextButton} from '@ui';
import {buySchema} from '../..';
import {Swiper} from '@assets/images/home';
import {useAppSelector} from '@hooks';
import {numberWithCommas, removeCommas, validateNumbers} from '@utilities';

export const BuySetUpForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );

  const [error, setError] = useState(false);

  const legalAdress = useAppSelector(state => state.auth.legalAdress);
  const [account, setAccount] = useState('');

  useEffect(() => {
    legalAdress.city === '' ? setError(true) : setError(false);
  }, [legalAdress]);

  const goToNext = (values: {[key: string]: string | number}) => {
    const {amount, amountOz, frequency, paymentMethod} = values;

    navigation.navigate(Screens.reviewSellBuy, {
      data: route.params.data,
      type: 'Buy',
      amount: removeCommas(amount),
      frequency,
      account,
      paymentMethod,
      amountOz,
    });
  };

  return (
    <Formik
      validationSchema={buySchema}
      initialValues={{
        amount: '',
        amountOz: '',
        frequency: 'One Time Purchase',
        paymentMethod: 'cashBalance',
      }}
      onSubmit={values => goToNext(values)}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
        setFieldTouched,
        setFieldValue,
      }) => {
        const getOz = () => {
          if (+removeCommas(values.amount) > 0)
            return `${(+removeCommas(values.amount) / 1887).toFixed(3)}`;
        };

        const getUsd = () => {
          if (+removeCommas(values.amountOz) > 0)
            return `${(+removeCommas(values.amountOz) * 1887).toFixed(0)}`;
        };

        return (
          <View>
            <Description style={styles.inputLabel}>Amount</Description>
            <View style={styles.amount}>
              <View style={{width: '49%'}}>
                <FormInput
                  onBlur={async () => {
                    setFieldTouched('amount', true);
                    setFieldTouched('amountOz', true);
                    await setFieldValue('amountOz', getOz());
                  }}
                  plaseholder="0.00"
                  keyboardType="numeric"
                  onChangeText={handleChange('amount')}
                  onFocus={() => {
                    setFieldTouched('amount', false);
                    setFieldTouched('amountOz', false);
                  }}
                  onInput={() => {
                    setFieldValue('amount', validateNumbers(values.amount));
                    setFieldValue('amountOz', getOz());
                  }}
                  errorStyle={{width: '180%'}}
                  value={values.amount}
                  leftPrefix="$"
                  errorMessage={errors.amount}
                  isTouched={touched.amount}
                  rightIcon={() => (
                    <SubtitleMedium style={{color: colors.gray}}>
                      USD
                    </SubtitleMedium>
                  )}
                />
              </View>
              <View style={{marginTop: 14, marginHorizontal: -10}}>
                <Swiper />
              </View>
              <View style={{width: '49%'}}>
                <FormInput
                  onBlur={async () => {
                    setFieldTouched('amount', true);
                    setFieldTouched('amountOz', true);
                    await setFieldValue('amount', getUsd());
                  }}
                  plaseholder="0"
                  onChangeText={handleChange('amountOz')}
                  onFocus={() => {
                    setFieldTouched('amount', false);
                    setFieldTouched('amountOz', false);
                  }}
                  onInput={() => {
                    setFieldValue(
                      'amountOz',
                      validateNumbers(values.amountOz, 4),
                    );
                    setFieldValue('amount', getUsd());
                  }}
                  value={values.amountOz}
                  isTouched={touched.amountOz}
                  errorMessage={errors.amountOz}
                  showError={false}
                  rightIcon={() => (
                    <SubtitleMedium style={{color: colors.gray}}>
                      OZ
                    </SubtitleMedium>
                  )}
                />
              </View>
            </View>

            <ItemPicker
              label="Frequency"
              items={[
                {label: 'One-Time Purchase', value: 'One-Time Purchase'},
                {label: 'Daily', value: 'Daily'},
                {label: 'Weekly', value: 'Weekly'},
                {label: 'Bi-weekly', value: 'Bi-weekly'},
                {label: 'Monthly', value: 'Monthly'},
              ]}
              errorMessage={errors.frequency}
              isTouched={touched.frequency}
              value={values.frequency}
              onChange={value => setFieldValue('frequency', value)}
            />

            <PaymentMethodPicker
              setPaymentType={value => setAccount(value)}
              label="Payment Method"
              onChange={(value: any) => setFieldValue('paymentMethod', value)}
            />

            <View style={styles.price}>
              <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
              <TitleMedium style={styles.priceTitle}>{`$${
                values.amount
                  ? numberWithCommas(
                      Number(removeCommas(values.amount)).toFixed(2),
                    )
                  : '0.00'
              }`}</TitleMedium>
            </View>

            <View style={{marginHorizontal: 10}}>
              {error && (
                <Error style={{marginBottom: 12}}>
                  Please{' '}
                  <Error
                    onPress={() => navigation.navigate(Screens.billing)}
                    style={styles.errorLink}>
                    provide your Legal Address
                  </Error>{' '}
                  in order to initiate this transaction.
                </Error>
              )}
              <TextButton
                style={{marginBottom: 20}}
                title="Confirm Buy"
                changeDisabledStyle={true}
                disabledStyle={{
                  backgroundColor:
                    values.paymentMethod === 'cashBalance' &&
                    cashBalance < +values.amount
                      ? '#F39A9A'
                      : '#C1D9FA',
                }}
                disabledTitle={
                  values.paymentMethod === 'cashBalance' &&
                  cashBalance < +values.amount
                    ? 'Insufficient Funds'
                    : null
                }
                disabled={
                  values.paymentMethod === 'cashBalance' &&
                  cashBalance < +values.amount
                    ? true
                    : paymentMethods[values.paymentMethod].length === 0 &&
                      values.paymentMethod !== 'cashBalance'
                    ? true
                    : !isValid
                    ? true
                    : account === '' && values.paymentMethod !== 'cashBalance'
                    ? true
                    : error
                    ? true
                    : false
                }
                solid
                onPress={handleSubmit}
              />
              <TextButton title="Cancel" onPress={() => navigation.pop()} />
              {values.paymentMethod === 'eCheck' && (
                <View style={{marginTop: 20}}>
                  <Description style={{color: colors.gray}}>
                    Log in (Plaid) to your online Checking account for instant
                    verification. We strongly encourage you to only link a
                    Checking account, as linking a Savings account may result in
                    processing delays and/or fees from your bank.
                  </Description>
                </View>
              )}
            </View>
          </View>
        );
      }}
    </Formik>
  );
};
