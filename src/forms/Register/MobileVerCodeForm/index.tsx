import React from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput} from '../../../components';
import {mobileVerCodeSchema} from '../..';
import {PaginationFooter} from '../../../components';
import {slides} from '../../../utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Screens} from '../../../constants';
import {Description} from '../../../components/Typography';
import {TextButton} from '../../../ui';

export const MobileVerCodeForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {type} = route.params;

  const goToNext = () => {
    type === 'SignIn'
      ? console.log('Done')
      : navigation.push(Screens.mobileVerSuccess, {
          values: {...route.params.values},
        });
  };

  return (
    <Formik
      validationSchema={mobileVerCodeSchema}
      initialValues={{
        code: '',
      }}
      onSubmit={() => goToNext()}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        setFieldTouched,
      }) => (
        <View style={styles.container}>
          <ScrollView>
            <FormInput
              label="Code"
              plaseholder="Your Code"
              onChangeText={handleChange('code')}
              onFocus={() => setFieldTouched('code', false)}
              value={values.code}
              errorMessage={errors.code}
              isTouched={touched.code}
            />
            {type === 'SignIn' ? (
              <Description style={{paddingHorizontal: 10}}>
                Have not received the code or has the time expired?{' '}
                <Description style={styles.description}>Send again</Description>
              </Description>
            ) : (
              <Description style={{paddingHorizontal: 10}}>
                Have not received the code or has the time expired?{' '}
                <Description style={styles.description}>Send again</Description>{' '}
                or{' '}
                <Description style={styles.description}>
                  Change mobile number
                </Description>
              </Description>
            )}
          </ScrollView>
          {type === 'SignIn' ? (
            <TextButton
              solid
              style={{marginBottom: 25}}
              title="Confirm"
              disabled={!isValid}
              onPress={handleSubmit}
            />
          ) : (
            <PaginationFooter
              data={slides}
              currentIndex={5}
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
