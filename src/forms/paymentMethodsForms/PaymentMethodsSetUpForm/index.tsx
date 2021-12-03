import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {View} from 'react-native';
import {BankForm, CardForm, paymentMethodSchema, PayPalForm} from '../..';
import {ItemPicker} from '@components';
import {useAppDispatch, useAppSelector} from '@hooks';
import {styles} from './styles';
import database from '@react-native-firebase/database';
import {addPaymentMethods} from '@store/slices/paymentMethodsSlice';
import {setLoading} from '@store/slices/authSlice';
import {getPaymentImage} from '@utilities';
import {ECheckForm} from '../ECheckForm';

export const PaymentMethodsSetUpForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const token = useAppSelector(state => state.auth.token);
  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );

  const {type} = route.params;

  const dispatch = useAppDispatch();

  const onSubmit = async (values: any) => {
    dispatch(setLoading(true));

    const {paymentMethod} = values;

    const id = `${Math.round(Math.random() * 1000000)}_${paymentMethod}`;

    await database()
      .ref(`/users/${token}/paymentMethods/${id}`)
      .set({...values, id});

    await dispatch(addPaymentMethods({...values, id}));

    await dispatch(setLoading(false));

    navigation.pop();
  };

  return (
    <Formik
      validationSchema={paymentMethodSchema}
      initialValues={{
        paymentMethod: type,
      }}
      onSubmit={values => onSubmit(values)}>
      {({
        values,
        errors,
        touched,

        setFieldValue,
      }) => {
        return (
          <View style={styles.container}>
            <ItemPicker
              LeftIcon={getPaymentImage(values.paymentMethod)}
              label="Payment Method"
              items={[
                {label: 'Credit/Debit Card', value: 'creditCard'},
                {label: 'Bank Wire', value: 'bankWire'},
                {label: 'PayPal', value: 'payPal'},
                {label: 'ACH/eCheck', value: 'eCheck'},
              ]}
              errorMessage={errors.paymentMethod}
              isTouched={touched.paymentMethod}
              value={values.paymentMethod}
              onChange={value => setFieldValue('paymentMethod', value)}
            />
            {values.paymentMethod === 'creditCard' && (
              <CardForm
                onSubmit={onSubmit}
                type="creditCard"
                label="Credit/Debit Card"
              />
            )}
            {values.paymentMethod === 'bankWire' && (
              <BankForm onSubmit={onSubmit} type="bankWire" label="Bank Wire" />
            )}
            {values.paymentMethod === 'payPal' && (
              <PayPalForm onSubmit={onSubmit} type="payPal" label="PayPal" />
            )}
            {values.paymentMethod === 'eCheck' && (
              <ECheckForm
                onSubmit={onSubmit}
                type="eCheck"
                label="ACH/eCheck"
              />
            )}
          </View>
        );
      }}
    </Formik>
  );
};
