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
import {getPaymentImage} from '@utilities';
import {ECheckForm} from '../ECheckForm';

export const PaymentMethodsSetUpForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const token = useAppSelector(state => state.auth.token);

  const [loading, setLoading] = useState(false);

  const {type} = route.params;

  const dispatch = useAppDispatch();

  const onSubmit = async (values: any) => {
    setLoading(true);

    const {paymentMethod} = values;

    const id = `${Math.round(Math.random() * 1000000)}_${paymentMethod}`;

    const data = {
      fullName:
        paymentMethod === 'creditCard'
          ? `Ending with ${values.cardNumber.split('').splice(-4).join('')}`
          : paymentMethod === 'bankWire' || paymentMethod === 'eCheck'
          ? `${values.name.toUpperCase()} ${values.accountType.toUpperCase()} ending with ${values.accountNumber.slice(
              -4,
            )}`
          : values.cardNumber,
      ...values,
      id,
    };

    await database().ref(`/users/${token}/paymentMethods/${id}`).set(data);

    await dispatch(addPaymentMethods(data));

    await setLoading(false);

    navigation.pop();
  };

  return (
    <Formik
      validationSchema={paymentMethodSchema}
      initialValues={{
        paymentMethod: type.split(' ')[1] === 'Add' ? type.split(' ')[0] : type,
      }}
      onSubmit={values => onSubmit(values)}>
      {({values, errors, touched, setFieldValue}) => {
        return (
          <View style={styles.container}>
            {type.split(' ')[1] === 'Add' ? null : (
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
            )}
            {values.paymentMethod === 'creditCard' && (
              <CardForm
                onSubmit={onSubmit}
                loading={loading}
                type="creditCard"
                label="Credit/Debit Card"
              />
            )}
            {values.paymentMethod === 'bankWire' && (
              <BankForm
                onSubmit={onSubmit}
                loading={loading}
                type="bankWire"
                label="Bank Wire"
              />
            )}
            {values.paymentMethod === 'payPal' && (
              <PayPalForm
                onSubmit={onSubmit}
                loading={loading}
                type="payPal"
                label="PayPal"
              />
            )}
            {values.paymentMethod === 'eCheck' && (
              <ECheckForm
                onSubmit={onSubmit}
                loading={loading}
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
