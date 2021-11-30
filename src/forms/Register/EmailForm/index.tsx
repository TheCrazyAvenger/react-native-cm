import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput} from '../../../components';
import {emailSchema} from '../..';
import {PaginationFooter} from '../../../components';
import {slides} from '../../../utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Screens} from '../../../constants';
import {TextButton} from '../../../ui';

export const EmailForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {type} = route.params;
  const {firstName, lastName, password} = route.params.values;
  console.log(type);

  const goToNext = (values: {[key: string]: string | boolean}) => {
    type
      ? navigation.push(Screens.emailVerification, {
          values: {...values, firstName, lastName, password},
        })
      : navigation.push(Screens.password, {
          type: 'SignUp',
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
          <ScrollView>
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
          {type ? (
            <TextButton
              title="Confirm"
              style={{marginVertical: 25}}
              solid
              onPress={handleSubmit}
            />
          ) : (
            <PaginationFooter
              data={slides}
              currentIndex={1}
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
