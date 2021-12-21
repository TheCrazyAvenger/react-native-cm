import React, {useState} from 'react';
import {Formik} from 'formik';
import {TextInput, View} from 'react-native';
import {FormInput} from '@components';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {TextButton} from '@ui';
import {contactUsSchema} from '../..';
import {Error} from '@Typography';

export const ContactUsForm: React.FC<{
  onSubmit: (...args: any) => void;
  error: null | string;
}> = ({onSubmit, error}) => {
  const email = useAppSelector(state => state.auth.userEmail);
  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);
  const mobile = useAppSelector(state => state.auth.mobile);

  const [height, setHeight] = useState(0);

  return (
    <Formik
      validationSchema={contactUsSchema}
      initialValues={{
        firstName,
        lastName,
        mobile,
        email,
        message: '',
      }}
      onSubmit={values => onSubmit(values)}>
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
            <FormInput
              onBlur={() => setFieldTouched('firstName', true)}
              label="First Name"
              plaseholder="Your First Name"
              onChangeText={handleChange('firstName')}
              onFocus={() => setFieldTouched('firstName', false)}
              value={values.firstName}
              errorMessage={errors.firstName}
              isTouched={touched.firstName}
            />
            <FormInput
              onBlur={() => setFieldTouched('lastName', true)}
              label="Last Name"
              plaseholder="Your Last Name"
              onChangeText={handleChange('lastName')}
              onFocus={() => setFieldTouched('lastName', false)}
              value={values.lastName}
              errorMessage={errors.lastName}
              isTouched={touched.lastName}
            />
            <FormInput
              onBlur={() => setFieldTouched('mobile', true)}
              label="Phone Number"
              plaseholder="Your Phone Number"
              onChangeText={handleChange('mobile')}
              onFocus={() => setFieldTouched('mobile', false)}
              value={values.mobile}
              errorMessage={errors.mobile}
              isTouched={touched.mobile}
            />
            <FormInput
              onBlur={() => setFieldTouched('email', true)}
              label="Email"
              plaseholder="Your Email"
              onChangeText={handleChange('email')}
              onFocus={() => setFieldTouched('email', false)}
              value={values.email}
              errorMessage={errors.email}
              isTouched={touched.email}
            />

            <FormInput
              onBlur={() => setFieldTouched('message', true)}
              label="Your Message"
              plaseholder="Your Message"
              multiline={true}
              onContentSizeChange={event => {
                setHeight(event.nativeEvent.contentSize.height);
              }}
              height={height}
              onChangeText={handleChange('message')}
              onFocus={() => setFieldTouched('message', false)}
              value={values.message}
              errorMessage={errors.message}
              isTouched={touched.message}
            />

            <View style={styles.button}>
              {error && <Error>{error}</Error>}

              <TextButton title="Send" solid onPress={handleSubmit} />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};
