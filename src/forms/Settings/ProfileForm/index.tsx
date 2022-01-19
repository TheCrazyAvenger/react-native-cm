import React, {useState} from 'react';
import {Formik} from 'formik';
import {View} from 'react-native';
import {FormInput} from '@components';
import {profileSchema} from '../..';
import {styles} from './styles';
import {useAppDispatch, useAppSelector} from '@hooks';
import {TextButton} from '@ui';
import database from '@react-native-firebase/database';
import {changeName} from '@store/slices/authSlice';
import {useNavigation} from '@react-navigation/native';

export const ProfileForm: React.FC = () => {
  const navigation: any = useNavigation();

  const token = useAppSelector(state => state.auth.token);
  const email = useAppSelector(state => state.auth.userEmail);
  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);

  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const saveData = async (values: {[key: string]: any}) => {
    try {
      setLoading(true);
      const {firstName, lastName} = values;

      await database().ref(`/users/${token}`).update({firstName, lastName});
      await dispatch(changeName({firstName, lastName}));

      await setLoading(false);
      navigation.pop();
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <Formik
      validationSchema={profileSchema}
      initialValues={{
        firstName: firstName,
        lastName: lastName,
        email: email,
      }}
      onSubmit={values => saveData(values)}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
        setFieldTouched,
      }) => {
        return (
          <View style={styles.container}>
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

            <TextButton
              title="Save Changes"
              solid
              loading={loading}
              disabled={!isValid || loading}
              style={{marginHorizontal: 10}}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};
