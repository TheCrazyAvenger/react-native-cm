import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {FormInput, ItemPicker, PaymentMethodPicker} from '@components';
import {Description, SubtitleMedium, TitleMedium, Error} from '@Typography';
import {TextButton} from '@ui';
import {buySchema} from '..';
import {Swiper} from '@assets/images/home';
import {useAppSelector} from '@hooks';
import {numberWithCommas, validateNumbers} from '@utilities';

export const FundWithDrawSetUpForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );

  const {type, paymentMethod} = route.params;

  const goToNext = (values: {[key: string]: string | number}) => {
    const {amount} = values;

    navigation.navigate(Screens.reviewSellBuy, {
      amount,
    });
  };

  return (
    <Formik
      validationSchema={buySchema}
      initialValues={{
        amount: '',
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
              onBlur={async () => setFieldTouched('amount', true)}
              label="Amount"
              plaseholder="USD"
              keyboardType="numeric"
              onChangeText={handleChange('amount')}
              onFocus={() => setFieldTouched('amount', false)}
              onInput={() =>
                setFieldValue('amount', validateNumbers(values.amount))
              }
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

            {paymentMethod === 'eCheck' &&
              paymentMethods[paymentMethod].length === 0 && (
                <View>
                  <Description style={styles.title}>Account</Description>
                  <TextButton
                    title="Link your bank account
              with Plaid"
                    style={{marginHorizontal: 10, paddingHorizontal: 50}}
                    onPress={() => navigation.navigate(Screens.addBankAccount)}
                  />
                </View>
              )}
            {/* <PaymentMethodPicker
              label="Payment Method"
              onChange={(value: any) => setFieldValue('paymentMethod', value)}
            /> */}

            <View style={styles.price}>
              <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
              <TitleMedium style={styles.priceTitle}>{`$${
                values.amount ? numberWithCommas(values.amount) : 0
              }`}</TitleMedium>
            </View>

            <View style={{paddingHorizontal: 10}}>
              <TextButton
                style={{marginBottom: 20}}
                title="Continue"
                solid
                onPress={handleSubmit}
              />
              <TextButton title="Cancel" onPress={() => navigation.pop()} />
              {paymentMethod === 'bankWire' && (
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
