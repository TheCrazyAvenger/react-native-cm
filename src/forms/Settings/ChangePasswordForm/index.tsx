import React, {useState} from 'react';
import {Formik} from 'formik';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {FormInput, PasswordItem} from '../../../components';
import {passwordSchema} from '../..';
import {PaginationFooter} from '../../../components';
import {passwordConditions, slides} from '../../../utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {colors, Screens} from '../../../constants';
import {TextButton} from '../../../ui';

export const ChangePasswordForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);

  const [lettersReg, setNumericReg] = useState<string | null>(null);
  const [numericReg, setLettersReg] = useState<string | null>(null);
  const [specReg, setSpecReg] = useState<string | null>(null);
  const [length, setLength] = useState<string | null>(null);

  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {type} = route.params;

  const goToNext = (values: {[key: string]: string | boolean}) => {
    const password = values.password;
    type === 'SignIn'
      ? navigation.push(Screens.forgotPassDone)
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
      validationSchema={passwordSchema}
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      onSubmit={values => goToNext(values)}>
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
                label="Password"
                plaseholder="Enter password"
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
                label="Confirm Password"
                plaseholder="Confirm password"
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

            {type === 'SignIn' ? (
              <TextButton
                title="Reset Password"
                style={{marginVertical: 25}}
                solid
                onPress={handleSubmit}
              />
            ) : (
              <PaginationFooter
                data={slides}
                currentIndex={2}
                onPress={handleSubmit}
                title="Continue"
                style={styles.footer}
              />
            )}
          </View>
        );
      }}
    </Formik>
  );
};
