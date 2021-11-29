import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {FormInput, ItemPicker} from '../../../components';
import {TextButton} from '../../../ui';
import {states} from '../../../utilities';
import {bankSchema, cardSchema} from '../..';

export const BankForm: React.FC<{
  onSubmit: (...args: any) => void;
  type: string;
}> = ({onSubmit, type}) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  return (
    <Formik
      validationSchema={bankSchema}
      initialValues={{
        name: '',
        cardNumber: '',
        accountNumber: '',
        accountType: 'Checking Account',
        accountName: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
      }}
      onSubmit={values =>
        onSubmit({
          ...values,
          paymentMethod: type,
        })
      }>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
      }) => {
        return (
          <View style={styles.container}>
            <FormInput
              label="Name on Card"
              plaseholder="Your Name on Card"
              onChangeText={handleChange('name')}
              onFocus={() => setFieldTouched('name', false)}
              value={values.name}
              onBlur={() => setFieldTouched('name', true)}
              errorMessage={errors.name}
              isTouched={touched.name}
            />

            <FormInput
              label="Routing Number"
              plaseholder="Your Routing Number"
              onChangeText={handleChange('cardNumber')}
              onFocus={() => setFieldTouched('cardNumber', false)}
              value={values.cardNumber}
              onBlur={() => setFieldTouched('cardNumber', true)}
              errorMessage={errors.cardNumber}
              isTouched={touched.cardNumber}
            />

            <FormInput
              label="Account Number"
              plaseholder="Your Account Number"
              onChangeText={handleChange('accountNumber')}
              onFocus={() => setFieldTouched('accountNumber', false)}
              value={values.accountNumber}
              onBlur={() => setFieldTouched('accountNumber', true)}
              errorMessage={errors.accountNumber}
              isTouched={touched.accountNumber}
            />

            <ItemPicker
              label="Type of Account"
              items={[{label: 'Checking Account', value: 'Checking Account'}]}
              value={values.accountType}
              onChange={value => setFieldValue('accountType', value)}
              errorMessage={errors.accountType}
              isTouched={touched.accountType}
            />

            <FormInput
              label="Exact Account Name"
              onBlur={() => setFieldTouched('accountName', true)}
              plaseholder="Your Exact Account Name"
              onChangeText={handleChange('accountName')}
              onFocus={() => setFieldTouched('accountName', false)}
              value={values.accountName}
              errorMessage={errors.accountName}
              isTouched={touched.accountName}
            />

            <FormInput
              label="Street Address"
              onBlur={() => setFieldTouched('address', true)}
              plaseholder="Your Street Address"
              onChangeText={handleChange('address')}
              onFocus={() => setFieldTouched('address', false)}
              value={values.address}
              errorMessage={errors.address}
              isTouched={touched.address}
            />

            <FormInput
              label="City"
              onBlur={() => setFieldTouched('city', true)}
              plaseholder="Your City"
              onChangeText={handleChange('city')}
              onFocus={() => setFieldTouched('city', false)}
              value={values.city}
              errorMessage={errors.city}
              isTouched={touched.city}
            />

            <View style={styles.datePicker}>
              <View style={{width: '60%'}}>
                <ItemPicker
                  label="State"
                  items={[...states.map(item => ({label: item, value: item}))]}
                  value={values.state}
                  onChange={value => setFieldValue('state', value)}
                  errorMessage={errors.state}
                  isTouched={touched.state}
                  labelStyle={{marginLeft: 0, marginTop: 5}}
                  style={{marginLeft: 0}}
                  showArrow={false}
                  errorStyle={{left: 0, top: 81}}
                />
              </View>
              <View style={{width: '43%'}}>
                <FormInput
                  label="Postal Code"
                  onBlur={() => setFieldTouched('postalCode', true)}
                  plaseholder="Your Code"
                  onChangeText={handleChange('postalCode')}
                  onFocus={() => setFieldTouched('postalCode', false)}
                  value={values.postalCode}
                  errorMessage={errors.postalCode}
                  isTouched={touched.postalCode}
                />
              </View>
            </View>

            <View style={styles.buttons}>
              <TextButton
                style={{marginBottom: 20}}
                solid
                title="Add"
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
