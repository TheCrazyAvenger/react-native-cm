import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {FormInput, ItemPicker, PaymentMethodPicker} from '@components';
import {Description, SubtitleMedium, TitleMedium, Error} from '@Typography';
import {TextButton} from '@ui';
import {Swiper} from '@assets/images/home';
import {useAppSelector} from '@hooks';
import {metals, numberWithCommas, validateNumbers} from '@utilities';
import {sellSchema} from '../..';

export const SellSetUpForm: React.FC<{metal: string}> = ({metal}) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);
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
    const {amount, amountOz, paymentMethod} = values;

    navigation.navigate(Screens.reviewSellBuy, {
      data: route.params.data,
      type: 'Sell',
      amount,
      account,
      frequency: null,
      paymentMethod,
      amountOz,
    });
  };

  return (
    <Formik
      validationSchema={sellSchema}
      initialValues={{
        amount: '',
        amountOz: '',
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
          if (+values.amount > 0)
            return `${(+values.amount / 1887).toFixed(3)}`;
        };

        const getUsd = () => {
          if (+values.amountOz > 0)
            return `${(+values.amountOz * 1887).toFixed(2)}`;
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
                  plaseholder="USD"
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
              <View style={{marginTop: 14, marginHorizontal: -15}}>
                <Swiper />
              </View>
              <View style={{width: '49%'}}>
                <FormInput
                  onBlur={async () => {
                    setFieldTouched('amount', true);
                    setFieldTouched('amountOz', true);
                    await setFieldValue('amount', getUsd());
                  }}
                  plaseholder="OZ"
                  onChangeText={handleChange('amountOz')}
                  onFocus={() => {
                    setFieldTouched('amount', false);
                    setFieldTouched('amountOz', false);
                  }}
                  onInput={() => {
                    setFieldValue('amountOz', validateNumbers(values.amountOz));
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

            <PaymentMethodPicker
              setPaymentType={value => setAccount(value)}
              label="Deposit to"
              onChange={(value: any) => setFieldValue('paymentMethod', value)}
            />

            <View style={styles.price}>
              <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
              <TitleMedium style={styles.priceTitle}>{`$${
                values.amount
                  ? numberWithCommas(Number(values.amount).toFixed(2))
                  : '0.00'
              }`}</TitleMedium>
            </View>

            <View style={{marginHorizontal: 10}}>
              {error && (
                <Error style={{marginBottom: 12}}>
                  Please{' '}
                  <Error
                    onPress={() => navigation.navigate(Screens.profile)}
                    style={styles.errorLink}>
                    provide your Legal Address
                  </Error>{' '}
                  in order to initiate this transaction.
                </Error>
              )}
              <TextButton
                style={{marginBottom: 20}}
                title={`Sell ${metal}`}
                changeDisabledStyle={true}
                disabledStyle={{
                  backgroundColor:
                    ownedMetals[metal] < +values.amountOz
                      ? '#F39A9A'
                      : '#C1D9FA',
                }}
                disabledTitle={
                  ownedMetals[metal] < +values.amountOz
                    ? 'Insufficient Holdings'
                    : null
                }
                disabled={
                  ownedMetals[metal] < +values.amountOz
                    ? true
                    : paymentMethods[values.paymentMethod].length === 0 &&
                      values.paymentMethod !== 'cashBalance'
                    ? true
                    : !isValid
                    ? true
                    : error
                    ? true
                    : false
                }
                solid
                onPress={handleSubmit}
              />
              <TextButton title="Cancel" onPress={() => navigation.pop()} />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};
