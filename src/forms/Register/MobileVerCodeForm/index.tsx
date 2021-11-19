import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput} from '../../../components';
import {mobileVerCodeSchema} from '../..';
import {PaginationFooter} from '../../../components';
import {slides} from '../../../utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Screens} from '../../../constants';
import {Description} from '../../../components/Typography';
import {TextButton} from '../../../ui';
import {useAppDispatch} from '../../../hooks/hooks';
import {useAuthMutation} from '../../../api';
import {
  authSucces,
  clearError,
  setError,
} from '../../../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MobileVerCodeForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [auth] = useAuthMutation();

  const dispatch = useAppDispatch();

  const {type, values} = route.params;

  const goToNext = () => {
    type === 'SignIn'
      ? navigation.push(Screens.home)
      : navigation.push(Screens.mobileVerSuccess, {
          values: {...route.params.values},
        });
  };

  const authHandler = async () => {
    try {
      const isLogin = false;
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

      goToNext();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      validationSchema={mobileVerCodeSchema}
      initialValues={{
        code: '',
      }}
      onSubmit={() => authHandler()}>
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
          <ScrollView>
            <FormInput
              label="Code"
              plaseholder="Your Code"
              onChangeText={handleChange('code')}
              onFocus={() => setFieldTouched('code', false)}
              value={values.code}
              errorMessage={errors.code}
              isTouched={touched.code}
            />
            {type === 'SignIn' ? (
              <Description style={{paddingHorizontal: 10}}>
                Have not received the code or has the time expired?{' '}
                <Description style={styles.description}>Send again</Description>
              </Description>
            ) : (
              <Description style={{paddingHorizontal: 10}}>
                Have not received the code or has the time expired?{' '}
                <Description style={styles.description}>Send again</Description>{' '}
                or{' '}
                <Description style={styles.description}>
                  Change mobile number
                </Description>
              </Description>
            )}
          </ScrollView>
          {type === 'SignIn' ? (
            <TextButton
              solid
              style={{marginBottom: 25}}
              title="Confirm"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          ) : (
            <PaginationFooter
              data={slides}
              currentIndex={5}
              onPress={handleSubmit}
              title="Continue"
              style={styles.footer}
            />
          )}
        </View>
      )}
    </Formik>
  );
};
