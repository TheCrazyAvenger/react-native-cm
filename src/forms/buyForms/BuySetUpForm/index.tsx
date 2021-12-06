import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {FormInput, ItemPicker, PaymentMethodPicker} from '@components';
import {Description, SubtitleMedium, TitleMedium, Error} from '@Typography';
import {TextButton} from '@ui';
import {buySchema} from '../..';
import {Swiper} from '@assets/images/home';
import {useAppSelector} from '@hooks';
import {validateNumbers} from '@utilities';

export const BuySetUpForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );
  const legalAdress = useAppSelector(state => state.auth.legalAdress);

  const goToNext = (values: {[key: string]: string | number}) => {
    const {amount, amountOz, frequency, paymentMethod} = values;

    navigation.navigate(Screens.reviewSellBuy, {
      data: route.params.data,
      type: 'Buy',
      amount,
      frequency,
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
          return `${(+values.amount / 1887).toFixed(3)}`;
        };

        return (
          <View>
            <View style={styles.amount}>
              <View style={{width: '47%'}}>
                <FormInput
                  onBlur={async () => {
                    setFieldTouched('amount', true);
                    setFieldTouched('amountOz', true);
                    await setFieldValue('amountOz', getOz());
                  }}
                  label="Amount"
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
                  errorMessage={errors.amount}
                  isTouched={touched.amount}
                  rightIcon={() => (
                    <SubtitleMedium style={{color: colors.gray}}>
                      USD
                    </SubtitleMedium>
                  )}
                />
              </View>
              <View style={{marginBottom: 40}}>
                <Swiper />
              </View>
              <View style={{width: '47%'}}>
                <FormInput
                  onBlur={() => {
                    setFieldTouched('amountOz', true);
                  }}
                  plaseholder="OZ"
                  onChangeText={handleChange('amountOz')}
                  onFocus={() => setFieldTouched('amountOz', false)}
                  value={values.amountOz}
                  isTouched={touched.amountOz}
                  errorMessage={errors.amountOz}
                  showError={false}
                  disabled
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
              label="Payment Method"
              onChange={(value: any) => setFieldValue('paymentMethod', value)}
            />

            <View style={styles.price}>
              <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
              <TitleMedium style={styles.priceTitle}>{`$${
                values.amount ? values.amount : 0
              }`}</TitleMedium>
            </View>

            {legalAdress.city === null && (
              <View style={styles.error}>
                <Error>Please, indicate the Legal Address in your </Error>
                <TouchableOpacity
                  onPress={() => navigation.navigate(Screens.profile)}>
                  <Error style={styles.profileError}>Profile.</Error>
                </TouchableOpacity>
              </View>
            )}

            <View style={{marginHorizontal: 10}}>
              <TextButton
                style={{marginBottom: 20}}
                title="Confirm Buy"
                changeDisabledStyle={true}
                disabledStyle={{
                  backgroundColor:
                    cashBalance < +values.amount ? '#F39A9A' : '#C1D9FA',
                }}
                disabledTitle={
                  cashBalance < +values.amount ? 'Insufficient Funds' : null
                }
                disabled={
                  cashBalance < +values.amount
                    ? true
                    : paymentMethods[values.paymentMethod].length === 0 &&
                      values.paymentMethod !== 'cashBalance'
                    ? true
                    : !isValid
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
