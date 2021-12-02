import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput} from '@components';
import {forgotPassSchema} from '../..';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/core';
import {Screens} from '@constants';
import {TextButton} from '@ui';

export const ForgotPassForm: React.FC = () => {
  const navigation: any = useNavigation();

  const goToNext = () => {
    navigation.push(Screens.forgotPassSucces);
  };

  return (
    <Formik
      validationSchema={forgotPassSchema}
      initialValues={{
        email: '',
      }}
      onSubmit={() => goToNext()}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
      }) => (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FormInput
              onBlur={() => setFieldTouched('email', true)}
              label="Email"
              plaseholder="Your email"
              onChangeText={handleChange('email')}
              onFocus={() => setFieldTouched('email', false)}
              value={values.email}
              errorMessage={errors.email}
              isTouched={touched.email}
            />
          </ScrollView>
          <TextButton
            title="Reset Password"
            solid
            onPress={handleSubmit}
            style={styles.footer}
          />
        </View>
      )}
    </Formik>
  );
};
