import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput} from '../../../components';
import {introduceSchema} from '../..';
import {CheckBoxItem, PaginationFooter} from '../../../components';
import {slides} from '../../../utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Screens} from '../../../constants';

export const IntroduceForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route = useRoute();
  console.log(route.params);
  const goToNext = (values: {[key: string]: string | boolean}) => {
    const {firstName, lastName} = values;
    navigation.push(Screens.email, {
      values: {firstName, lastName},
    });
  };

  return (
    <Formik
      validationSchema={introduceSchema}
      initialValues={{
        firstName: '',
        lastName: '',
        checkBox: false,
      }}
      onSubmit={values => goToNext(values)}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <ScrollView>
            <FormInput
              label="First Name"
              plaseholder="Your First Name"
              onChangeText={handleChange('firstName')}
              onFocus={() => setFieldTouched('firstName', false)}
              value={values.firstName}
              errorMessage={errors.firstName}
              isTouched={touched.firstName}
            />
            <FormInput
              label="Last Name"
              plaseholder="Your Last Name"
              onChangeText={handleChange('lastName')}
              onFocus={() => setFieldTouched('lastName', false)}
              value={values.lastName}
              errorMessage={errors.lastName}
              isTouched={touched.lastName}
            />

            <CheckBoxItem
              value={values.checkBox}
              isTouched={touched.checkBox}
              onPress={() => setFieldValue('checkBox', !values.checkBox)}
              error={errors.checkBox}
            />
          </ScrollView>

          <PaginationFooter
            data={slides}
            currentIndex={0}
            onPress={handleSubmit}
            title="Continue"
            style={styles.footer}
          />
        </View>
      )}
    </Formik>
  );
};
