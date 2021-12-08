import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {DatePicker, FormInput, ItemPicker} from '@components';
import {verificationSchema} from '../..';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {useAppDispatch} from '@hooks';
import {TextButton} from '@ui';
import {states} from '@utilities';
import {Screens} from '@constants';

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
            <ScrollView showsVerticalScrollIndicator={false}>
              <FormInput
                onBlur={() => setFieldTouched('firstName', true)}
                label="First Name"
                plaseholder="Your First Name"
                onChangeText={handleChange('firstName')}
                onFocus={() => setFieldTouched('firstName', false)}
                value={values.firstName}
                errorMessage={errors.firstName}
                isTouched={touched.firstName}
              />
              <FormInput
                onBlur={() => setFieldTouched('lastName', true)}
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
                onBlur={() => setFieldTouched('mobile', true)}
                label="Phone Number"
                plaseholder="Your Phone Number"
                onChangeText={handleChange('mobile')}
                onFocus={() => setFieldTouched('mobile', false)}
                value={values.mobile}
                errorMessage={errors.mobile}
                isTouched={touched.mobile}
              />
            </ScrollView>
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
