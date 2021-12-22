import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {FormInput, ItemPicker} from '@components';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
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

  const [eCheck, setECheck] = useState(
    paymentMethods.eCheck.length > 0 ? paymentMethods.eCheck[0].fullName : '',
  );

  useEffect(() => {
    paymentMethods.eCheck.length > 0 &&
      setECheck(paymentMethods.eCheck[0].fullName);
  }, [paymentMethods]);

  const {type, paymentMethod} = route.params;

  const goToNext = (values: {[key: string]: string | number}) => {
    const {amount} = values;

    navigation.navigate(Screens.reviewFundWithdraw, {
      amount,
      type,
      paymentMethod,
    });
  };

  return (
    <Formik
      validationSchema={fundWithdrawSchema}
      initialValues={{
        amount: '',
        paymentMethod: eCheck,
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
              label="Amount"
              leftPrefix="$"
              plaseholder="USD"
              keyboardType="numeric"
              onChangeText={handleChange('amount')}
              onFocus={() => setFieldTouched('amount', false)}
              onInput={() =>
                setFieldValue('amount', validateNumbers(values.amount))
              }
              errorStyle={{width: '90%'}}
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
                  title="Link your bank account
              with Plaid"
                  style={{marginHorizontal: 10, paddingHorizontal: 50}}
                  onPress={() =>
                    navigation.navigate(Screens.paymentMethodsSetUp, {
                      type: 'eCheckAdd',
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
                      type: 'bankWire',
                    })
                  }
                />
              </View>
            ) : (
              <ItemPicker
                labelStyle={{marginTop: 25}}
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
                value={values.paymentMethod}
                onChange={value => {
                  setFieldValue('paymentMethod', value);
                }}
              />
            )}

            <View style={styles.price}>
              <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
              <TitleMedium style={styles.priceTitle}>{`$${
                values.amount
                  ? numberWithCommas(Number(values.amount).toFixed(2))
                  : 0
              }`}</TitleMedium>
            </View>

            <View style={{paddingHorizontal: 10}}>
              <TextButton
                style={{marginBottom: 20}}
                title="Continue"
                disabled={
                  !isValid && paymentMethods[paymentMethod].length === 0
                }
                solid
                onPress={handleSubmit}
              />
              <TextButton title="Cancel" onPress={() => navigation.pop()} />
              {paymentMethod === 'eCheck' && (
                <View style={{marginTop: 20}}>
                  <Description style={{color: colors.gray}}>
                    Please note, if you fund your account with ACH/eCheck and
                    subsequently withdraw funds within 45 days, those funds will
                    be returned to your originating bank account regardless
                    of your selected withdrawal method.
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
