import React from 'react';
import {Formik} from 'formik';
import {View} from 'react-native';
import {FormInput} from '../../../components';
import {mobileVerCodeSchema} from '../..';
import {PaginationFooter} from '../../../components';
import {slides} from '../../../utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Screens} from '../../../constants';

export const MobileVerCodeForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const goToNext = () => {
    navigation.push(Screens.mobileVerSuccess, {
      values: {...route.params.values},
    });
  };

  return (
    <Formik
      validationSchema={mobileVerCodeSchema}
      initialValues={{
        code: '',
      }}
      onSubmit={values => goToNext()}>
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
              label="Code"
              plaseholder="Your Code"
              onChangeText={handleChange('code')}
              onFocus={() => setFieldTouched('code', false)}
              value={values.code}
              errorMessage={errors.code}
              isTouched={touched.code}
            />
          </View>
          <PaginationFooter
            data={slides}
            currentIndex={5}
            onPress={handleSubmit}
            title="Continue"
            style={styles.footer}
          />
        </View>
      )}
    </Formik>
  );
};
