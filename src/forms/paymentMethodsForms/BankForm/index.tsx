import {useNavigation} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import {FormInput, ItemPicker} from '@components';
import {TextButton} from '@ui';
import {Error} from '@Typography';
import {states, validatePasscode} from '@utilities';
import {bankSchema} from '../..';
import {useAppSelector} from '@hooks';

export const BankForm: React.FC<{
  onSubmit: (...args: any) => void;
  type: string;
  label: string;
  loading: boolean;
}> = ({onSubmit, type, label, loading}) => {
  const navigation: any = useNavigation();

  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );
  const legalAdress = useAppSelector(state => state.auth.legalAdress);
  const {streetAdress, city, state, postalCode}: any = legalAdress;

  const [error, setError] = useState<null | string>(null);

  return (
    <Formik
      validationSchema={bankSchema}
      initialValues={{
        name: '',
        routingNumber: '',
        accountNumber: '',
        accountType: 'Checking Account',
        accountName: '',
        address: streetAdress,
        city,
        state,
        postalCode,
      }}
      onSubmit={values =>
        onSubmit({
          ...values,
          paymentMethod: type,
          label,
        })
      }>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        setFieldTouched,
        setFieldValue,
      }) => {
        const checkAllAccounts = () => {
          setError(null);
          paymentMethods.bankWire.map(
            (item: any) =>
              item.routingNumber === values.routingNumber &&
              item.accountNumber === values.accountNumber &&
              setError(
                'You have entered a bank account that is already linked. Please re-enter your bank information or visit my account > settings > payment methods to review your linked accounts',
              ),
          );
        };

        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <FormInput
              label="Bank Name"
              plaseholder="Your Name on Card"
              onChangeText={handleChange('name')}
              onFocus={() => setFieldTouched('name', false)}
              value={values.name}
              onBlur={async () => {
                await setFieldValue('name', values.name.trim());
                setFieldTouched('name', true);
              }}
              errorMessage={errors.name}
              isTouched={touched.name}
            />

            <FormInput
              label="Routing Number"
              plaseholder="Your Routing Number"
              onChangeText={handleChange('routingNumber')}
              keyboardType="numeric"
              onFocus={() => setFieldTouched('routingNumber', false)}
              value={values.routingNumber}
              onBlur={async () => {
                await setFieldValue(
                  'routingNumber',
                  values.routingNumber.trim(),
                );

                await setFieldTouched('routingNumber', true);
                checkAllAccounts();
              }}
              onInput={() =>
                setFieldValue(
                  'routingNumber',
                  validatePasscode(values.routingNumber),
                )
              }
              errorMessage={errors.routingNumber}
              isTouched={touched.routingNumber}
            />

            <FormInput
              label="Account Number"
              plaseholder="Your Account Number"
              keyboardType="numeric"
              onChangeText={handleChange('accountNumber')}
              onFocus={() => setFieldTouched('accountNumber', false)}
              value={values.accountNumber}
              onBlur={async () => {
                await setFieldTouched('accountNumber', true);
                checkAllAccounts();
              }}
              onInput={() =>
                setFieldValue(
                  'accountNumber',
                  validatePasscode(values.accountNumber),
                )
              }
              errorMessage={errors.accountNumber}
              isTouched={touched.accountNumber}
            />

            <ItemPicker
              label="Type of Account"
              items={[
                {label: 'Checking Account', value: 'Checking Account'},
                {label: 'Savings Account', value: 'Savings Account'},
              ]}
              maxHeight={120}
              value={values.accountType}
              onChange={value => setFieldValue('accountType', value)}
              errorMessage={errors.accountType}
              isTouched={touched.accountType}
            />

            <FormInput
              label="Exact Account Name"
              onBlur={async () => {
                await setFieldValue('accountName', values.accountName.trim());
                setFieldTouched('accountName', true);
              }}
              plaseholder="Your Exact Account Name"
              onChangeText={handleChange('accountName')}
              onFocus={() => setFieldTouched('accountName', false)}
              value={values.accountName}
              errorMessage={errors.accountName}
              isTouched={touched.accountName}
            />

            <FormInput
              label="Street Address"
              onBlur={async () => {
                await setFieldValue('address', values.address.trim());
                setFieldTouched('address', true);
              }}
              plaseholder="Your Street Address"
              onChangeText={handleChange('address')}
              onFocus={() => setFieldTouched('address', false)}
              value={values.address}
              errorMessage={errors.address}
              isTouched={touched.address}
            />

            <FormInput
              label="City"
              onBlur={async () => {
                await setFieldValue('city', values.city.trim());
                setFieldTouched('city', true);
              }}
              plaseholder="Your City"
              onChangeText={handleChange('city')}
              onFocus={() => setFieldTouched('city', false)}
              value={values.city}
              errorMessage={errors.city}
              isTouched={touched.city}
            />

            <View style={styles.datePicker}>
              <View style={{width: '60%'}}>
                <ItemPicker
                  label="State"
                  items={[...states.map(item => ({label: item, value: item}))]}
                  value={values.state}
                  onChange={value => setFieldValue('state', value)}
                  errorMessage={errors.state}
                  isTouched={touched.state}
                  labelStyle={{marginLeft: 0, marginTop: 5}}
                  style={{marginLeft: 0}}
                  showArrow={false}
                  errorStyle={{left: 0, top: 81}}
                />
              </View>
              <View style={{width: '43%', marginTop: 4}}>
                <FormInput
                  label="Postal Code"
                  onBlur={() => setFieldTouched('postalCode', true)}
                  plaseholder="Your Code"
                  keyboardType="numeric"
                  onChangeText={handleChange('postalCode')}
                  onFocus={() => setFieldTouched('postalCode', false)}
                  onInput={() =>
                    setFieldValue(
                      'postalCode',
                      validatePasscode(values.postalCode),
                    )
                  }
                  value={values.postalCode}
                  errorMessage={errors.postalCode}
                  isTouched={touched.postalCode}
                />
              </View>
            </View>

            <View style={styles.buttons}>
              {error && (
                <Error style={{marginBottom: 32, textAlign: 'left'}}>
                  {error}
                </Error>
              )}

              <TextButton
                style={{marginBottom: 20}}
                solid
                loading={loading}
                disabled={!isValid || error || loading}
                title="Add"
                onPress={handleSubmit}
              />

              <TextButton title="Cancel" onPress={() => navigation.pop()} />
            </View>
          </ScrollView>
        );
      }}
    </Formik>
  );
};
