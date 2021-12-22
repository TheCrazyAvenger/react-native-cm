import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput, PaginationFooter} from '@components';
import {mobileSchema} from '../..';
import {slides} from '@utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Screens} from '@constants';

export const MobileVerForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const goToNext = async (values: {[key: string]: string}) => {
    navigation.push(Screens.mobileVerCode, {
      type: 'SignUp',
      values: {...values, ...route.params.values},
      token: null,
    });
  };

  return (
    <Formik
      validationSchema={mobileSchema}
      initialValues={{
        mobile: '',
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
      }) => (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FormInput
              onBlur={() => setFieldTouched('mobile', true)}
              label="Mobile Number"
              plaseholder="Your Phone Number"
              onChangeText={handleChange('mobile')}
              onFocus={() => setFieldTouched('mobile', false)}
              value={values.mobile}
              errorMessage={errors.mobile}
              isTouched={touched.mobile}
            />
          </ScrollView>
          <PaginationFooter
            data={slides}
            currentIndex={4}
            disabled={!isValid}
            onPress={handleSubmit}
            title="Continue"
            style={styles.footer}
          />
        </View>
      )}
    </Formik>
  );
};
