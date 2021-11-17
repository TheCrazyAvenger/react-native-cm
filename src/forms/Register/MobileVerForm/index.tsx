import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput} from '../../../components';
import {mobileSchema} from '../..';
import {PaginationFooter} from '../../../components';
import {slides} from '../../../utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Screens} from '../../../constants';

export const MobileVerForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const goToNext = (values: {[key: string]: string | boolean}) => {
    navigation.push(Screens.mobileVerCode, {
      type: 'SignUp',
      values: {...values, ...route.params.values},
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
        touched,
        setFieldTouched,
      }) => (
        <View style={styles.container}>
          <ScrollView>
            <FormInput
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
            onPress={handleSubmit}
            title="Continue"
            style={styles.footer}
          />
        </View>
      )}
    </Formik>
  );
};
