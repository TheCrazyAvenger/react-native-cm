import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput} from '../../../components';
import {profileSchema} from '../..';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {TextButton} from '../../../ui';
import {changeName} from '../../../store/slices/authSlice';

export const ProfileForm: React.FC = () => {
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();

  const email = useAppSelector(state => state.auth.userEmail);
  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);

  const saveChanges = async (values: {[key: string]: any}) => {
    const {firstName, lastName} = values;

    await dispatch(changeName({firstName, lastName}));
    navigation.pop();
  };

  return (
    <Formik
      validationSchema={profileSchema}
      initialValues={{
        firstName: firstName,
        lastName: lastName,
        email: email,
      }}
      onSubmit={values => saveChanges(values)}>
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
              <FormInput
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
