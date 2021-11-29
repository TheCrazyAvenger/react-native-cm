import React, {useState} from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput} from '../../../components';
import {mobileSchema} from '../..';
import {PaginationFooter} from '../../../components';
import {slides} from '../../../utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Screens} from '../../../constants';
import auth from '@react-native-firebase/auth';

export const MobileVerForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [confirm, setConfirm] = useState<any>(null);

  // console.log(confirm);

  const goToNext = async (values: {[key: string]: string}) => {
    // const confirmation = await auth().signInWithPhoneNumber(values.mobile);
    // await setConfirm(confirmation);
    // console.log(confirm);
    navigation.push(Screens.mobileVerCode, {
      code: '123456',
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
            onPress={handleSubmit}
            title="Continue"
            style={styles.footer}
          />
        </View>
      )}
    </Formik>
  );
};
