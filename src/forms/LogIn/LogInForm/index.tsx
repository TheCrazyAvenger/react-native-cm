import React, {useState} from 'react';
import {Formik} from 'formik';
import {Image, TouchableOpacity, View} from 'react-native';
import {FormInput} from '@components';
import {logInSchema} from '../..';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {Screens} from '@constants';
import {Description} from '@Typography';
import {TextButton} from '@ui';

export const LogInForm: React.FC<{
  onSubmit: (...args: any) => void;
  loading: boolean;
}> = ({onSubmit, loading}) => {
  const [showPassword, setShowPassword] = useState(true);
  const navigation: any = useNavigation();

  return (
    <Formik
      validationSchema={logInSchema}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={values => onSubmit(values)}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        setFieldTouched,
      }) => (
        <View style={styles.container}>
          <View style={styles.form}>
            <FormInput
              onBlur={() => setFieldTouched('email', true)}
              label="Email"
              plaseholder="Your Email"
              onChangeText={handleChange('email')}
              onFocus={() => setFieldTouched('email', false)}
              value={values.email}
              errorMessage={errors.email}
              isTouched={touched.email}
            />

            <FormInput
              onBlur={() => setFieldTouched('password', true)}
              label="Password"
              plaseholder="Your Password"
              onChangeText={handleChange('password')}
              onFocus={() => setFieldTouched('password', false)}
              value={values.password}
              errorMessage={errors.password}
              isTouched={touched.password}
              secureTextEntry={showPassword}
              rightIcon={() => (
                <TouchableOpacity
                  onPress={() => setShowPassword(prev => !prev)}>
                  <Image
                    source={require('../../../assets/images/register/show.png')}
                  />
                </TouchableOpacity>
              )}
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
            loading={loading}
            disabled={loading || !isValid}
            onPress={handleSubmit}
            style={{marginHorizontal: 10}}
          />
        </View>
      )}
    </Formik>
  );
};
