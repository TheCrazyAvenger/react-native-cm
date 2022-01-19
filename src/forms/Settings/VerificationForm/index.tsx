import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {DatePicker, FormInput} from '@components';
import {verificationSchema} from '../..';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {useAppSelector} from '@hooks';
import {TextButton} from '@ui';
import {Screens} from '@constants';

export const VerificationForm: React.FC = () => {
  const navigation: any = useNavigation();

  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);
  const mobile = useAppSelector(state => state.auth.mobile);

  const saveChanges = async (values: {[key: string]: any}) => {
    navigation.navigate(Screens.documentsVerification, {values});
  };

  return (
    <Formik
      validationSchema={verificationSchema}
      initialValues={{
        firstName,
        lastName,
        dateOfBirth: '',
        mobile,
      }}
      onSubmit={values => saveChanges(values)}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
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
                labelStyle={{paddingLeft: 10}}
                value={values.dateOfBirth}
                onConfirm={date => setFieldValue('dateOfBirth', date)}
                style={styles.datePicker}
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
              disabled={!isValid}
              style={{marginBottom: 25, marginHorizontal: 9}}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};
