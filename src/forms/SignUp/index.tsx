import React from 'react';
import {Formik} from 'formik';
import {Screen} from '../../ui';
import {View} from 'react-native';
import {Input} from 'react-native-elements';

export const SignUp: React.FC = () => {
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
      }}
      onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <Input
            label="First Name"
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
          />
          <Input
            label="Second Name"
            onChangeText={handleChange('firstName')}
            onBlur={handleBlur('firstName')}
            value={values.firstName}
          />
        </View>
      )}
    </Formik>
  );
};
