import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput} from '@components';
import {profileSchema} from '../..';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {TextButton} from '@ui';

export const ProfileForm: React.FC<{onSubmit: (...args: any) => void}> = ({
  onSubmit,
}) => {
  const email = useAppSelector(state => state.auth.userEmail);
  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);

  return (
    <Formik
      validationSchema={profileSchema}
      initialValues={{
        firstName: firstName,
        lastName: lastName,
        email: email,
      }}
      onSubmit={values => onSubmit(values)}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
      }) => {
        return (
          <View style={styles.container}>
            <ScrollView>
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
              <FormInput
                onBlur={() => setFieldTouched('email', true)}
                label="Email"
                plaseholder="Your Email"
                onChangeText={handleChange('email')}
                onFocus={() => setFieldTouched('email', false)}
                value={values.email}
                errorMessage={errors.email}
                isTouched={touched.email}
                disabled
              />
            </ScrollView>

            <TextButton
              title="Save Changes"
              solid
              style={{marginBottom: 25}}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};
