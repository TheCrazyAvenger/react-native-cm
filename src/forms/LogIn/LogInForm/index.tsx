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
import {useAuthMutation} from '../../../api';
import {useAppDispatch} from '../../../hooks/hooks';
import {
  authSucces,
  clearError,
  setError,
} from '../../../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LogInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();

  const [auth] = useAuthMutation();

  const authHandler = async (values: any) => {
    try {
      const isLogin = true;
      const authData = {...values, isLogin};
      const response: any = await auth(authData);

      const data = response.data;

      dispatch(clearError());
      const expirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000,
      );
      const userEmail = values.email;
      const token = data.idToken;

      await AsyncStorage.setItem('userEmail', JSON.stringify(values.email));
      await AsyncStorage.setItem(
        'token',
        JSON.stringify(response.data.idToken),
      );
      await AsyncStorage.setItem(
        'expirationDate',
        JSON.stringify(expirationDate),
      );
      dispatch(authSucces({userEmail, token}));

      goToNext(values);
    } catch (e) {
      console.log(e);
    }
  };

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
      onSubmit={values => authHandler(values)}>
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
