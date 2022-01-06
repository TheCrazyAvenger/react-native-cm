import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {colors, FUND_TAX, Screens, WITHDRAW_TAX} from '@constants';
import {styles} from './styles';
import {FormInput, ItemPicker, WithdrawTaxItem} from '@components';
import {Description, Error, SubtitleMedium, TitleMedium} from '@Typography';
import {TextButton} from '@ui';
import {useAppSelector} from '@hooks';
import {numberWithCommas, validateNumbers} from '@utilities';
import {fundWithdrawSchema} from '../schemas';

export const FundWithDrawSetUpForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );
  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const verified = useAppSelector(state => state.auth.verified);

  const [error, setError] = useState(false);
  const [eCheck, setECheck] = useState(
    paymentMethods.eCheck.length > 0 ? paymentMethods.eCheck[0].fullName : '',
  );
  const [bankWire, setBankWire] = useState(
    paymentMethods.bankWire.length > 0
      ? paymentMethods.bankWire[0].fullName
      : '',
  );

  useEffect(() => {
    !verified ? setError(true) : setError(false);
  }, [verified]);

  useEffect(() => {
    paymentMethods.eCheck.length > 0 &&
      setECheck(paymentMethods.eCheck[0].fullName);
    paymentMethods.bankWire.length > 0 &&
      setBankWire(paymentMethods.bankWire[0].fullName);
  }, [paymentMethods]);

  const {type, paymentMethod} = route.params;

  const goToNext = (values: {[key: string]: string | number}) => {
    const {amount, paymentMethod: account} = values;

    navigation.navigate(Screens.reviewFundWithdraw, {
      amount,
      account,
      type,
      paymentMethod,
    });
  };

  return (
    <Formik
      validationSchema={fundWithdrawSchema}
      initialValues={{
        amount: '',
        paymentMethod: paymentMethod === 'eCheck' ? eCheck : bankWire,
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
        return (
          <View>
            <FormInput
              onBlur={() => setFieldTouched('amount', true)}
              label={`${type === 'Fund' ? 'Deposit ' : ''}Amount`}
              leftPrefix="$"
              plaseholder="USD"
              keyboardType="numeric"
              onChangeText={handleChange('amount')}
              onFocus={() => setFieldTouched('amount', false)}
              onInput={() =>
                setFieldValue('amount', validateNumbers(values.amount))
              }
              value={values.amount}
              errorMessage={errors.amount}
              isTouched={touched.amount}
              rightIcon={() => (
                <SubtitleMedium style={{color: colors.gray}}>
                  USD
                </SubtitleMedium>
              )}
            />

            {paymentMethod === 'eCheck' &&
            paymentMethods[paymentMethod].length === 0 ? (
              <View>
                <Description style={styles.title}>Account</Description>
                <TextButton
                  title="Link your bank account with Plaid"
                  style={{marginHorizontal: 10, paddingHorizontal: 50}}
                  onPress={() =>
                    navigation.navigate(Screens.paymentMethodsSetUp, {
                      type: 'eCheck Add',
                    })
                  }
                />
              </View>
            ) : paymentMethod === 'bankWire' &&
              paymentMethods[paymentMethod].length === 0 ? (
              <View>
                <Description style={styles.title}>Account</Description>
                <TextButton
                  title="Add Bank Wire"
                  style={{marginHorizontal: 10, paddingHorizontal: 50}}
                  onPress={() =>
                    navigation.navigate(Screens.paymentMethodsSetUp, {
                      type: 'bankWire Add',
                    })
                  }
                />
              </View>
            ) : (paymentMethod === 'eCheck' || type === 'Withdraw') &&
              paymentMethods[paymentMethod].length !== 0 ? (
              <ItemPicker
                label="Account"
                style={styles.eCheckPicker}
                placeholderStyle={styles.pickerPlaceholder}
                items={paymentMethods[paymentMethod].map((item: any) => ({
                  label: item.fullName,
                  value: item.fullName,
                }))}
                errorMessage={errors.paymentMethod}
                isTouched={touched.paymentMethod}
                maxHeight={150}
                textStyle={{fontSize: 13, maxWidth: '85%'}}
                value={values.paymentMethod}
                onChange={value => {
                  setFieldValue('paymentMethod', value);
                }}
              />
            ) : null}

            {type === 'Withdraw' && <WithdrawTaxItem amount={values.amount} />}
            <View
              style={{
                ...styles.price,
                marginTop:
                  paymentMethod === 'bankWire' || type === 'Withdraw' ? 0 : 20,
              }}>
              <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
              <TitleMedium style={styles.priceTitle}>{`$${
                values.amount
                  ? numberWithCommas(
                      Number(
                        type === 'Fund'
                          ? +values.amount - +values.amount * FUND_TAX
                          : +values.amount - +values.amount * WITHDRAW_TAX,
                      ).toFixed(2),
                    )
                  : '0.00'
              }`}</TitleMedium>
            </View>

            <View style={{paddingHorizontal: 10}}>
              {error && type === 'Withdraw' && (
                <Error style={{marginBottom: 12}}>
                  Your account is not yet verified. You must complete the
                  account{' '}
                  <Error
                    onPress={() =>
                      navigation.navigate(Screens.verificationStack)
                    }
                    style={styles.errorLink}>
                    verification
                  </Error>{' '}
                  process before withdrawing funds.
                </Error>
              )}
              <TextButton
                style={{marginBottom: 20}}
                title="Continue"
                changeDisabledStyle={true}
                disabledStyle={{
                  backgroundColor:
                    type === 'Withdraw' && cashBalance < +values.amount
                      ? '#F39A9A'
                      : '#C1D9FA',
                }}
                disabledTitle={
                  type === 'Withdraw' && cashBalance < +values.amount
                    ? 'Insufficient Funds'
                    : null
                }
                disabled={
                  !isValid ||
                  paymentMethods[paymentMethod].length === 0 ||
                  (type === 'Withdraw' && cashBalance < +values.amount) ||
                  (error && type === 'Withdraw')
                }
                solid
                onPress={handleSubmit}
              />
              <TextButton title="Cancel" onPress={() => navigation.pop()} />

              <View style={{marginTop: 20}}>
                <Description style={{color: colors.gray}}>
                  Please note, if you fund your account with ACH/eCheck and
                  subsequently withdraw funds within 45 days, those funds will
                  be returned to your originating bank account regardless of
                  your selected withdrawal method.
                </Description>
              </View>
            </View>
          </View>
        );
      }}
    </Formik>
  );
};
