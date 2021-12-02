import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {colors, Screens} from '@constants';
import {styles} from './styles';
import {FormInput, ItemPicker} from '@components';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
import {TextButton} from '@ui';
import {CashBalance} from '@assets/images/settings';
import {buySchema} from '../..';
import {Swiper} from '@assets/images/home';

export const BuySetUpForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const goToNext = (values: {[key: string]: string | number}) => {
    const {amount, amountOz, frequency, paymentMethod} = values;

    navigation.navigate(Screens.reviewBuy, {
      data: route.params.data,
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
        paymentMethod: 'Cash Balance',
      }}
      onSubmit={values => goToNext(values)}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
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
                  onBlur={() => setFieldTouched('amount', true)}
                  label="Amount"
                  plaseholder="USD"
                  onChangeText={handleChange('amount')}
                  onFocus={() => setFieldTouched('amount', false)}
                  onInput={() => setFieldValue('amountOz', getOz())}
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
                  onBlur={() => setFieldTouched('amountOz', true)}
                  plaseholder="OZ"
                  onChangeText={handleChange('amountOz')}
                  onFocus={() => setFieldTouched('amountOz', false)}
                  value={values.amountOz}
                  errorMessage={errors.amountOz}
                  isTouched={touched.amountOz}
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

            <Description style={styles.title}>Payment Method</Description>
            <TouchableOpacity
              style={styles.paymentMethod}
              activeOpacity={0.7}
              onPress={() => console.log('Choose payment method')}>
              <View style={{marginRight: 12}}>
                <CashBalance />
              </View>
              <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
                Cash Balance: $54.80
              </SubtitleMedium>
            </TouchableOpacity>

            <View style={styles.price}>
              <TitleMedium style={styles.priceTitle}>Total</TitleMedium>
              <TitleMedium style={styles.priceTitle}>{`$${
                values.amount ? values.amount : 0
              }`}</TitleMedium>
            </View>

            <View style={{marginHorizontal: 10}}>
              <TextButton
                style={{marginBottom: 20}}
                title="Confirm Buy"
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
