import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {styles} from './styles';
import {reviewBuySchema} from '../..';
import {validatePasscode} from '@utilities';
import {useAppDispatch, useAppSelector} from '@hooks';
import {Input} from 'react-native-elements';
import {colors} from '@constants';
import {setPasscode} from '@store/slices/authSlice';
import {LoadingItem} from '@components';
import database from '@react-native-firebase/database';
import {TextButton} from '@ui';

export const PasscodeForm: React.FC<{
  setError: (...args: any) => void;
  onChange: (...args: any) => void;
  setLoading: (...args: any) => void;
}> = ({onChange, setLoading, setError}) => {
  const autoFocus: any = useRef(null);
  const navigation: any = useNavigation();

  const route: any = useRoute();
  const token = useAppSelector(state => state.auth.token);

  useEffect(() => {
    autoFocus.current!.focus();
  }, []);

  const dispatch = useAppDispatch();

  const createPasscode = async (passcode: string) => {
    try {
      setLoading(true);
      await database()
        .ref(`/users/${token}/loginMethods/passcode`)
        .set(passcode);
      await dispatch(setPasscode({loginMethod: 'passcode', value: passcode}));
      await setLoading(false);
      navigation.goBack({passcode: true});
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      validationSchema={reviewBuySchema}
      initialValues={{
        passcode: '',
        confirmPasscode: '',
      }}
      onSubmit={values => console.log(values)}>
      {({handleChange, values, setFieldValue}) => {
        const isPassFull = values.passcode.length === 4 ? true : false;

        const checkPasscodes = () => {
          if (
            values.confirmPasscode.length === 4 &&
            values.confirmPasscode === values.passcode
          ) {
            createPasscode(values.passcode);
          } else if (
            values.confirmPasscode.length === 4 &&
            values.confirmPasscode !== values.passcode
          ) {
            setError(true);

            setFieldValue('confirmPasscode', '');
          }
        };
        return (
          <View style={styles.container}>
            <View style={styles.dots}>
              {Array.from(Array(4).keys()).map((item, i) => {
                const backgroundColor =
                  i <=
                  (isPassFull
                    ? values.confirmPasscode.length
                    : values.passcode.length) -
                    1
                    ? colors.primary
                    : colors.white;

                return (
                  <TouchableWithoutFeedback
                    onPress={() => autoFocus.current.focus()}
                    key={i}>
                    <View style={{...styles.dot, backgroundColor}} />
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
            <Input
              ref={autoFocus}
              autoFocus={true}
              keyboardType="numeric"
              containerStyle={{left: -1000}}
              onChangeText={handleChange(
                isPassFull ? 'confirmPasscode' : 'passcode',
              )}
              onTextInput={async () => {
                await setFieldValue(
                  isPassFull ? 'confirmPasscode' : 'passcode',
                  validatePasscode(
                    isPassFull ? values.confirmPasscode : values.passcode,
                  ),
                );
                onChange(validatePasscode(values.passcode));
                checkPasscodes();
              }}
              value={isPassFull ? values.confirmPasscode : values.passcode}
            />
          </View>
        );
      }}
    </Formik>
  );
};
