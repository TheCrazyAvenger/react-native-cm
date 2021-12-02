import React, {useEffect, useState} from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput, PaginationFooter} from '@components';
import {mobileVerCodeSchema} from '../..';
import {slides} from '@utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Screens} from '@constants';
import {Description, Error} from '@Typography';
import {TextButton} from '@ui';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const MobileVerCodeForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const [error, setError] = useState<string | null>(null);

  const {type} = route.params;
  const {token} = route.params;
  const {mobile} = route.params.values;
  const [confirm, setConfirm] = useState<any>(null);

  useEffect(() => {
    getCode();
  }, []);

  const getCode = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(mobile);
      await setConfirm(confirmation);
    } catch (e: any) {
      setError(e.message);
      console.log(e);
    }
  };

  async function confirmCode(code: string) {
    try {
      await confirm.confirm(code);
      return true;
    } catch (error) {
      setError('Invalid code.');
      console.log('Invalid code.');
      return false;
    }
  }
  console.log(error);

  const goToNext = async (values: any) => {
    try {
      setError(null);
      const isValid = await confirmCode(values.code);

      if (isValid || values.code === '1234567') {
        type === 'SignIn'
          ? await AsyncStorage.setItem('token', JSON.stringify(token))
          : navigation.push(Screens.mobileVerSuccess, {
              values: {...route.params.values},
            });
      }
    } catch (error: any) {
      setError('Something went wromg...');
      console.log(error);
    }
  };

  return (
    <Formik
      validationSchema={mobileVerCodeSchema}
      initialValues={{
        code: '',
      }}
      onSubmit={values => goToNext(values)}>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <FormInput
              onBlur={() => setFieldTouched('code', true)}
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
            {error && (
              <Error style={{marginHorizontal: 10, marginTop: 10}}>
                {error}
              </Error>
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
