import React, {useState} from 'react';
import {Formik} from 'formik';
import {ScrollView, View} from 'react-native';
import {CheckBoxItem, FormInput, ItemPicker} from '@components';
import {profileSchema} from '../..';
import {styles} from './styles';
import {useAppSelector} from '@hooks';
import {TextButton} from '@ui';
import {Description, Subtitle} from '@Typography';
import {states} from '@utilities';
import {colors} from '@constants';

export const ProfileForm: React.FC<{
  onSubmit: (...args: any) => void;
  loading: boolean;
}> = ({onSubmit, loading}) => {
  const email = useAppSelector(state => state.auth.userEmail);
  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);
  const legalAdress = useAppSelector(state => state.auth.legalAdress);
  const shippingAdress = useAppSelector(state => state.auth.shippingAdress);
  const [disabled, setDisabled] = useState(false);

  const {streetAdress, city, state, postalCode}: any = legalAdress;
  const {
    streetAdress: streetAdressShipping,
    city: cityShipping,
    state: stateShipping,
    postalCode: postalCodeShipping,
  }: any = shippingAdress;

  return (
    <Formik
      validationSchema={profileSchema}
      initialValues={{
        firstName: firstName,
        lastName: lastName,
        email: email,
        legalStreetAdress: streetAdress ? streetAdress : '',
        legalCity: city ? city : '',
        legalState: state ? state : '',
        legalCode: postalCode ? postalCode : '',
        shippingStreetAdress: streetAdressShipping ? streetAdressShipping : '',
        shippingCity: cityShipping ? cityShipping : '',
        shippingState: stateShipping ? stateShipping : '',
        shippingCode: postalCodeShipping ? postalCodeShipping : '',
        checkBox: false,
      }}
      onSubmit={values => onSubmit(values)}>
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
        const changeFields = () => {
          if (!values.checkBox) {
            setFieldValue('shippingStreetAdress', values.legalStreetAdress);
            setFieldValue('shippingCity', values.legalCity);
            setFieldValue('shippingState', values.legalState);
            setFieldValue('shippingCode', values.legalCode);
            setDisabled(true);
          } else {
            setDisabled(false);
          }
        };

        const checkBoxError =
          errors.checkBox && touched.checkBox ? colors.red : colors.black;
        return (
          <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                onBlur={() => setFieldTouched('email', true)}
                label="Email"
                plaseholder="Your Email"
                onChangeText={handleChange('email')}
                onFocus={() => setFieldTouched('email', false)}
                value={values.email}
                errorMessage={errors.email}
                isTouched={touched.email}
                disabled
              />

              <Subtitle style={styles.title}>Legal Address</Subtitle>
              <FormInput
                onBlur={() => setFieldTouched('legalStreetAdress', true)}
                label="Street Address"
                plaseholder="Your Street Address"
                onChangeText={handleChange('legalStreetAdress')}
                onFocus={() => setFieldTouched('legalStreetAdress', false)}
                onInput={() =>
                  values.checkBox &&
                  setFieldValue(
                    'shippingStreetAdress',
                    values.legalStreetAdress,
                  )
                }
                value={values.legalStreetAdress}
                errorMessage={errors.legalStreetAdress}
                isTouched={touched.legalStreetAdress}
              />
              <FormInput
                onBlur={() => setFieldTouched('legalCity', true)}
                label="City"
                plaseholder="Your City"
                onChangeText={handleChange('legalCity')}
                onFocus={() => setFieldTouched('legalCity', false)}
                onInput={() =>
                  values.checkBox &&
                  setFieldValue('shippingCity', values.legalCity)
                }
                value={values.legalCity}
                errorMessage={errors.legalCity}
                isTouched={touched.legalCity}
              />
              <ItemPicker
                label="State"
                items={[...states.map(item => ({label: item, value: item}))]}
                value={values.legalState}
                onChange={value => {
                  values.checkBox && setFieldValue('shippingState', value);
                  setFieldValue('legalState', value);
                }}
                errorMessage={errors.legalState}
                isTouched={touched.legalState}
              />
              <FormInput
                onBlur={() => setFieldTouched('legalCode', true)}
                label="Postal Code"
                plaseholder="Your Postal Code"
                onChangeText={handleChange('legalCode')}
                onFocus={() => setFieldTouched('legalCode', false)}
                onInput={() =>
                  values.checkBox &&
                  setFieldValue('shippingCode', values.legalCode)
                }
                value={values.legalCode}
                errorMessage={errors.legalCode}
                isTouched={touched.legalCode}
              />

              <Subtitle style={styles.title}>Shipping Address</Subtitle>
              <CheckBoxItem
                value={values.checkBox}
                isTouched={touched.checkBox}
                containerStyle={{alignItems: 'center', marginBottom: 20}}
                onPress={async () => {
                  await setFieldValue('checkBox', !values.checkBox);
                  changeFields();
                }}
                error={errors.checkBox}>
                <Description style={{color: checkBoxError}}>
                  Same as Above
                </Description>
              </CheckBoxItem>

              <FormInput
                onBlur={() => setFieldTouched('shippingStreetAdress', true)}
                label="Street Address"
                plaseholder="Your Street Address"
                disabled={disabled}
                onChangeText={handleChange('shippingStreetAdress')}
                onFocus={() => setFieldTouched('shippingStreetAdress', false)}
                value={values.shippingStreetAdress}
                errorMessage={errors.shippingStreetAdress}
                isTouched={touched.shippingStreetAdress}
              />
              <FormInput
                onBlur={() => setFieldTouched('shippingCity', true)}
                label="City"
                plaseholder="Your City"
                disabled={disabled}
                onChangeText={handleChange('shippingCity')}
                onFocus={() => setFieldTouched('shippingCity', false)}
                value={values.shippingCity}
                errorMessage={errors.shippingCity}
                isTouched={touched.shippingCity}
              />
              <ItemPicker
                label="State"
                items={[...states.map(item => ({label: item, value: item}))]}
                value={values.shippingState}
                disabled={disabled}
                onChange={value => setFieldValue('shippingState', value)}
                errorMessage={errors.shippingState}
                isTouched={touched.shippingState}
              />
              <FormInput
                onBlur={() => setFieldTouched('shippingCode', true)}
                label="Postal Code"
                plaseholder="Your Postal Code"
                disabled={disabled}
                onChangeText={handleChange('shippingCode')}
                onFocus={() => setFieldTouched('shippingCode', false)}
                value={values.shippingCode}
                containerStyle={{marginBottom: 20}}
                errorMessage={errors.shippingCode}
                isTouched={touched.shippingCode}
              />
            </ScrollView>

            <TextButton
              title="Save Changes"
              solid
              loading={loading}
              disabled={!isValid || loading}
              style={{marginBottom: 25}}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};
