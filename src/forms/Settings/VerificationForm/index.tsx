import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {DatePicker, FormInput, ItemPicker} from '../../../components';
import {profileSchema, verificationSchema} from '../..';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {TextButton} from '../../../ui';
import {changeName} from '../../../store/slices/authSlice';
import {states} from '../../../utilities';
import {Screens} from '../../../constants';

export const VerificationForm: React.FC = () => {
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();

  const saveChanges = async (values: {[key: string]: any}) => {
    navigation.navigate(Screens.documentsVerification, {values});
  };

  return (
    <Formik
      validationSchema={verificationSchema}
      initialValues={{
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        mobile: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'United States of America',
      }}
      onSubmit={values => saveChanges(values)}>
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
              label="First Name"
              plaseholder="Your First Name"
              onChangeText={handleChange('firstName')}
              onFocus={() => setFieldTouched('firstName', false)}
              value={values.firstName}
              errorMessage={errors.firstName}
              isTouched={touched.firstName}
            />
            <FormInput
              label="Last Name"
              plaseholder="Your Last Name"
              onChangeText={handleChange('lastName')}
              onFocus={() => setFieldTouched('lastName', false)}
              value={values.lastName}
              errorMessage={errors.lastName}
              isTouched={touched.lastName}
            />
            <DatePicker
              errorMessage={errors.dateOfBirth}
              isTouched={touched.dateOfBirth}
              label="Date of Birth"
              value={values.dateOfBirth}
              onConfirm={date => setFieldValue('dateOfBirth', date)}
              style={styles.datePicker}
              errorStyle={styles.dateError}
              showIcon={false}
            />
            <FormInput
              label="Phone Number"
              plaseholder="Your Phone Number"
              onChangeText={handleChange('mobile')}
              onFocus={() => setFieldTouched('mobile', false)}
              value={values.mobile}
              errorMessage={errors.mobile}
              isTouched={touched.mobile}
            />
            <FormInput
              label="Address 1"
              plaseholder="Your Address 1"
              onChangeText={handleChange('address1')}
              onFocus={() => setFieldTouched('address1', false)}
              value={values.address1}
              errorMessage={errors.address1}
              isTouched={touched.address1}
            />
            <FormInput
              label="Address 2"
              plaseholder="Your Address 2"
              onChangeText={handleChange('address2')}
              onFocus={() => setFieldTouched('address2', false)}
              value={values.address2}
              errorMessage={errors.address2}
              isTouched={touched.address2}
            />
            <FormInput
              label="City"
              plaseholder="Your City"
              onChangeText={handleChange('city')}
              onFocus={() => setFieldTouched('city', false)}
              value={values.city}
              errorMessage={errors.city}
              isTouched={touched.city}
            />
            <ItemPicker
              label="State"
              items={[...states.map(item => ({label: item, value: item}))]}
              value={values.state}
              onChange={value => setFieldValue('state', value)}
              errorMessage={errors.state}
              isTouched={touched.state}
            />
            <FormInput
              label="Postal Code"
              plaseholder="Your Postal Code"
              onChangeText={handleChange('postalCode')}
              onFocus={() => setFieldTouched('postalCode', false)}
              value={values.postalCode}
              errorMessage={errors.postalCode}
              isTouched={touched.postalCode}
            />
            <FormInput
              label="Country of Residence"
              plaseholder="Your Country of Residence"
              onChangeText={handleChange('country')}
              onFocus={() => setFieldTouched('country', false)}
              value={values.country}
              errorMessage={errors.country}
              isTouched={touched.country}
              disabled
            />

            <TextButton
              title="Continue"
              solid
              style={{marginBottom: 25, marginHorizontal: 9}}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};