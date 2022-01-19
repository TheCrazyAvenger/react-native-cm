import React, {useState} from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {FormInput, PaginationFooter} from '@components';
import {mobileVerCodeSchema} from '../..';
import {slides} from '@utilities';
import {styles} from './styles';
import {useNavigation, useRoute} from '@react-navigation/core';
import {Screens} from '@constants';
import {Description, Error} from '@Typography';
import {TextButton} from '@ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from '@hooks';
import {getData} from '@store/actions';
import {getOperations} from '@store/actions/operations';
import {getAutoBuy} from '@store/actions/autoBuy';
import {getPriceAlerts} from '@store/actions/priceAlerts';
import {getPaymentMethod} from '@store/actions/paymentMethod';

export const MobileVerCodeForm: React.FC<{showNotify: () => void}> = ({
  showNotify,
}) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {type, token} = route.params;

  const dispatch = useAppDispatch();

  const goToNext = async (values: any) => {
    try {
      setError(null);

      if (values.code === '1234567') {
        if (type === 'SignIn') {
          setLoading(true);
          await AsyncStorage.setItem('token', JSON.stringify(token));
          await dispatch(getOperations());
          await dispatch(getAutoBuy());
          await dispatch(getPriceAlerts());
          await dispatch(getPaymentMethod());
          dispatch(getData());
        } else {
          navigation.push(Screens.mobileVerSuccess, {
            values: {...route.params.values},
          });
        }
      } else {
        setError('Wrong code (just type 1234567)');
      }
    } catch (error: any) {
      setError('Something went wrong...');
      console.log(error);
    }
  };

  return (
    <Formik
      validationSchema={mobileVerCodeSchema}
      initialValues={{
        code: '1234567',
      }}
      onSubmit={values => goToNext(values)}>
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <FormInput
              onBlur={() => setFieldTouched('code', true)}
              label="Code"
              plaseholder="Your Code"
              onChangeText={handleChange('code')}
              onFocus={() => setFieldTouched('code', false)}
              value={values.code}
              errorMessage={errors.code}
              isTouched={touched.code}
            />

            <Description style={{paddingHorizontal: 10}}>
              Have not received the code or has the time expired?{' '}
              <Description onPress={showNotify} style={styles.description}>
                Send again{' '}
              </Description>
              {type === 'SignUp' && (
                <Description>
                  or{' '}
                  <Description
                    onPress={() => navigation.goBack()}
                    style={styles.description}>
                    Change mobile number
                  </Description>
                </Description>
              )}
            </Description>

            {error && (
              <Error style={{marginHorizontal: 10, marginTop: 10}}>
                {error}
              </Error>
            )}
          </ScrollView>
          {type === 'SignIn' ? (
            <TextButton
              solid
              style={{marginBottom: 25}}
              title="Confirm"
              disabled={!isValid || loading}
              loading={loading}
              onPress={handleSubmit}
            />
          ) : (
            <PaginationFooter
              data={slides}
              disabled={!isValid}
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
