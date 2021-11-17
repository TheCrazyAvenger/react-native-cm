import React from 'react';
import {Formik} from 'formik';
import {TouchableOpacity, View} from 'react-native';
import {FormInput} from '../../../components';
import {logInSchema} from '../..';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {Screens} from '../../../constants';
import {Description} from '../../../components/Typography';
import {TextButton} from '../../../ui';

export const LogInForm: React.FC = () => {
  const navigation: any = useNavigation();

  const goToNext = (values: {[key: string]: string | boolean}) => {
    const {email, password} = values;
    navigation.push(Screens.mobileVerCode, {
      type: 'SignIn',
      values: {email, password},
    });
  };

  return (
    <Formik
      validationSchema={logInSchema}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={values => goToNext(values)}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
      }) => (
        <View style={styles.container}>
          <View style={styles.form}>
            <FormInput
              label="Email"
              plaseholder="Your email"
              onChangeText={handleChange('email')}
              onFocus={() => setFieldTouched('email', false)}
              value={values.email}
              errorMessage={errors.email}
              isTouched={touched.email}
            />
            <FormInput
              label="Password"
              plaseholder="Your password"
              onChangeText={handleChange('password')}
              onFocus={() => setFieldTouched('password', false)}
              value={values.password}
              errorMessage={errors.password}
              isTouched={touched.password}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(Screens.forgotPassword)}>
              <Description style={styles.forgotPass}>
                Forgot your password?
              </Description>
            </TouchableOpacity>
          </View>
          <TextButton
            title="Log in"
            solid
            onPress={handleSubmit}
            style={{marginHorizontal: 10}}
          />
        </View>
      )}
    </Formik>
  );
};
