import React from 'react';
import {Formik} from 'formik';
import {View} from 'react-native';
import {FormInput} from '../../../components';
import {emailSchema} from '../..';
import {PaginationFooter} from '../../../components';
import {slides} from '../../../utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Screens} from '../../../constants';

export const EmailForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const goToNext = (values: {[key: string]: string | boolean}) => {
    navigation.push(Screens.password, {
      values: {...values, ...route.params.values},
    });
  };

  return (
    <Formik
      validationSchema={emailSchema}
      initialValues={{
        email: '',
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
          </View>
          <PaginationFooter
            data={slides}
            currentIndex={1}
            onPress={handleSubmit}
            title="Continue"
            style={styles.footer}
          />
        </View>
      )}
    </Formik>
  );
};
