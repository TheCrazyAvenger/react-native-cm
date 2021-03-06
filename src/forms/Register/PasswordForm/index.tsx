import React, {useState} from 'react';
import {Formik} from 'formik';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {FormInput, PasswordItem} from '@components';
import {passwordSchema} from '../..';
import {PaginationFooter} from '@components';
import {passwordConditions, slides} from '@utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {colors, Screens} from '@constants';
import {TextButton} from '@ui';
import {useAppSelector} from '@hooks';
import * as yup from 'yup';
import {Error} from '@Typography';

export const PasswordForm: React.FC<{
  changePassword?: (password: any) => void;
  loading?: boolean;
  error?: any;
}> = ({changePassword, loading, error}) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {type} = route.params;

  const password = useAppSelector(state => state.auth.password);

  const schema =
    type === 'Change'
      ? passwordSchema.concat(
          yup.object().shape({
            currentPassword: yup
              .string()
              .required('Enter your current password')
              .oneOf([password], 'Passwords does not match'),
          }),
        )
      : passwordSchema;

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);

  const [lettersReg, setNumericReg] = useState<string | null>(null);
  const [numericReg, setLettersReg] = useState<string | null>(null);
  const [specReg, setSpecReg] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);

  const goToNext = (values: {[key: string]: string | boolean | number}) => {
    const password = values.password;

    type === 'SignIn'
      ? navigation.push(Screens.forgotPassDone)
      : type === 'Change'
      ? //@ts-ignore
        changePassword(password)
      : navigation.push(Screens.emailVerification, {
          values: {password, ...route.params.values},
        });
  };

  const checkPassword = (text: string) => {
    const lettersReg = /(?=.*[a-z])(?=.*[A-Z])/;
    const numericReg = /[0-9]/;
    const specReg = /[?@%#&!*]/;
    text.match(lettersReg) ? setLettersReg('1') : setLettersReg(null);
    text.match(numericReg) ? setNumericReg('2') : setNumericReg(null);
    text.match(specReg) ? setSpecReg('3') : setSpecReg(null);
    text.length >= 8 ? setLength('4') : setLength(null);
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        password: '',
        confirmPassword: '',
        currentPassword: '',
      }}
      onSubmit={values => goToNext(values)}>
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
          <View
            style={{
              ...styles.container,
              marginTop: type === 'Change' ? 20 : 0,
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {type === 'Change' && (
                <FormInput
                  onBlur={() => setFieldTouched('currentPassword', true)}
                  label="Current Password"
                  plaseholder="Enter Current Password"
                  onChangeText={handleChange('currentPassword')}
                  onFocus={() => setFieldTouched('currentPassword', false)}
                  value={values.currentPassword}
                  errorMessage={errors.currentPassword}
                  isTouched={touched.currentPassword}
                  secureTextEntry={showCurrentPassword}
                  rightIcon={() => (
                    <TouchableOpacity
                      onPress={() => setShowCurrentPassword(prev => !prev)}>
                      <Image
                        source={require('../../../assets/images/register/show.png')}
                      />
                    </TouchableOpacity>
                  )}
                />
              )}

              <FormInput
                onBlur={() => setFieldTouched('password', true)}
                label="Password"
                plaseholder="Your Password"
                onChangeText={handleChange('password')}
                onInput={() => checkPassword(values.password)}
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
              {passwordConditions.map(item => {
                const regColor =
                  item.id === lettersReg ||
                  item.id === numericReg ||
                  item.id === specReg ||
                  item.id === length
                    ? colors.primary
                    : colors.paleBlue;

                return (
                  <PasswordItem
                    key={item.id}
                    color={regColor}
                    text={item.text}
                  />
                );
              })}

              <FormInput
                onBlur={() => setFieldTouched('confirmPassword', true)}
                label="Confirm Password"
                plaseholder="Your Password Confirmation"
                onChangeText={handleChange('confirmPassword')}
                onFocus={() => setFieldTouched('confirmPassword', false)}
                value={values.confirmPassword}
                errorMessage={errors.confirmPassword}
                isTouched={touched.confirmPassword}
                secureTextEntry={showConfirmPassword}
                rightIcon={() =>
                  errors.confirmPassword || values.confirmPassword === '' ? (
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(prev => !prev)}>
                      <Image
                        source={require('../../../assets/images/register/show.png')}
                      />
                    </TouchableOpacity>
                  ) : (
                    <Image
                      source={require('../../../assets/images/register/check.png')}
                    />
                  )
                }
              />
            </ScrollView>
            <View style={{marginTop: 25}}>
              {error && <Error style={{marginBottom: 12}}>{error}</Error>}
              {type === 'SignIn' ? (
                <TextButton
                  title="Reset Password"
                  disabled={!isValid}
                  style={{marginBottom: 25}}
                  solid
                  onPress={handleSubmit}
                />
              ) : type === 'Change' ? (
                <TextButton
                  disabled={!isValid || loading}
                  title="Save changes"
                  loading={loading}
                  style={{marginBottom: 25}}
                  solid
                  onPress={handleSubmit}
                />
              ) : (
                <PaginationFooter
                  data={slides}
                  disabled={!isValid}
                  currentIndex={2}
                  onPress={handleSubmit}
                  title="Continue"
                  style={styles.footer}
                />
              )}
            </View>
          </View>
        );
      }}
    </Formik>
  );
};
