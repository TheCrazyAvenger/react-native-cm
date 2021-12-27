import React, {useState} from 'react';
import {Formik} from 'formik';
import {View} from 'react-native';
import {FormInput, ItemPicker} from '@components';
import {billingSchema} from '../..';
import {styles} from './styles';
import {TextButton} from '@ui';
import {Error, SubtitleMedium} from '@Typography';
import {states} from '@utilities';
import {useAppDispatch, useAppSelector} from '@hooks';
import database from '@react-native-firebase/database';
import {setLegalAdress} from '@store/slices/authSlice';
import {useNavigation} from '@react-navigation/native';

export const BillingForm: React.FC<{}> = () => {
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const token = useAppSelector(state => state.auth.token);

  const saveAddress = async (values: {[key: string]: string}) => {
    try {
      setError(null);
      setLoading(true);

      const {streetAddress, city, postalCode, state} = values;

      const legalAdress = {
        streetAdress: streetAddress,
        city,
        postalCode,
        state,
      };

      await database().ref(`/users/${token}`).update({legalAdress});
      await dispatch(setLegalAdress(legalAdress));

      await setLoading(false);

      navigation.pop();
    } catch (e: any) {
      console.log(e);
      setError(e);
    }
  };

  return (
    <Formik
      validationSchema={billingSchema}
      initialValues={{
        streetAddress: '',
        city: '',
        state: '',
        postalCode: '',
      }}
      onSubmit={values => saveAddress(values)}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <View style={styles.container}>
            <SubtitleMedium style={styles.title}>
              Before you place your first order, we need to quickly collect your
              billing address. You can change your billing address anytime in
              your Profile.
            </SubtitleMedium>
            <FormInput
              onBlur={() => setFieldTouched('streetAddress', true)}
              label="Street Address"
              plaseholder="Your Street Address"
              onChangeText={handleChange('streetAddress')}
              onFocus={() => setFieldTouched('streetAddress', false)}
              value={values.streetAddress}
              errorMessage={errors.streetAddress}
              isTouched={touched.streetAddress}
            />
            <FormInput
              onBlur={() => setFieldTouched('city', true)}
              label="City"
              plaseholder="Your City"
              onChangeText={handleChange('city')}
              onFocus={() => setFieldTouched('city', false)}
              value={values.city}
              errorMessage={errors.city}
              isTouched={touched.city}
            />
            <View style={styles.row}>
              <View style={{width: '68%'}}>
                <ItemPicker
                  label="State"
                  items={[...states.map(item => ({label: item, value: item}))]}
                  value={values.state}
                  onChange={value => setFieldValue('state', value)}
                  errorMessage={errors.state}
                  style={{marginBottom: 0}}
                  isTouched={touched.state}
                />
              </View>
              <View style={{width: '35%', marginLeft: -30}}>
                <FormInput
                  onBlur={() => setFieldTouched('postalCode', true)}
                  label="Postal Code"
                  plaseholder="Your Postal Code"
                  onChangeText={handleChange('postalCode')}
                  onFocus={() => setFieldTouched('postalCode', false)}
                  value={values.postalCode}
                  errorMessage={errors.postalCode}
                  isTouched={touched.postalCode}
                />
              </View>
            </View>
            {error && <Error style={styles.error}>{error}</Error>}
            <TextButton
              title="Save Changes"
              solid
              loading={loading}
              disabled={!isValid || loading}
              style={{marginBottom: 25, marginHorizontal: 10}}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};
