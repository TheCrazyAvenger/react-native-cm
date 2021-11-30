import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {BankForm, CardForm, paymentMethodSchema, PayPalForm} from '../..';
import {CreditCard} from '../../../assets/images/settings';
import {ItemPicker} from '../../../components';
import {Screens} from '../../../constants';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {styles} from './styles';
import database from '@react-native-firebase/database';
import {addPaymentMethods} from '../../../store/slices/paymentMethodsSlice';
import {setLoading} from '../../../store/slices/authSlice';
import {getPaymentImage} from '../../../utilities';
import {ECheckForm} from '../ECheckForm';

export const PaymentMethodsSetUpForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const token = useAppSelector(state => state.auth.token);
  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );

  const dispatch = useAppDispatch();

  const onSubmit = async (values: any) => {
    dispatch(setLoading(true));

    const id = paymentMethods.length + 1;

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
        paymentMethod: 'Credit/Debit Card',
      }}
      onSubmit={values => onSubmit(values)}>
      {({
        handleSubmit,
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
                {label: 'Credit/Debit Card', value: 'Credit/Debit Card'},
                {label: 'Bank Wire', value: 'Bank Wire'},
                {label: 'PayPal', value: 'PayPal'},
                {label: 'ACH/eCheck', value: 'ACH/eCheck'},
              ]}
              errorMessage={errors.paymentMethod}
              isTouched={touched.paymentMethod}
              value={values.paymentMethod}
              onChange={value => setFieldValue('paymentMethod', value)}
            />
            {values.paymentMethod === 'Credit/Debit Card' && (
              <CardForm onSubmit={onSubmit} type="Credit/Debit Card" />
            )}
            {values.paymentMethod === 'Bank Wire' && (
              <BankForm onSubmit={onSubmit} type="Bank Wire" />
            )}
            {values.paymentMethod === 'PayPal' && (
              <PayPalForm onSubmit={onSubmit} type="PayPal" />
            )}
            {values.paymentMethod === 'ACH/eCheck' && (
              <ECheckForm onSubmit={onSubmit} type="ACH/eCheck" />
            )}
          </View>
        );
      }}
    </Formik>
  );
};
