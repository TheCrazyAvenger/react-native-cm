import React, {useState} from 'react';
import {Formik} from 'formik';
import {Image, TouchableOpacity, View} from 'react-native';
import {FormInput} from '../../../components';
import {logInSchema} from '../..';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {Screens} from '../../../constants';
import {Description} from '../../../components/Typography';
import {TextButton} from '../../../ui';
import {useAppDispatch} from '../../../hooks/hooks';

export const LogInForm: React.FC<{onSubmit: (...args: any) => void}> = ({
  onSubmit,
}) => {
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
              plaseholder="Enter password"
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
            onPress={handleSubmit}
            style={{marginHorizontal: 10}}
          />
        </View>
      )}
    </Formik>
  );
};
