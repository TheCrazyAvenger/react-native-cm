import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import {DatePicker, FormInput, ItemPicker} from '@components';
import {Subtitle, Error} from '@Typography';
import {TextButton} from '@ui';
import {
  cardInputValidation,
  cardNumberValidation,
  setCard,
  states,
  validatePasscode,
} from '@utilities';
import {cardSchema} from '../..';
import {
  AmericanExpress,
  Discover,
  MasterCard,
  Visa,
} from '@assets/images/settings';
import {useAppSelector} from '@hooks';

export const CardForm: React.FC<{
  onSubmit: (...args: any) => void;
  type: string;
  label: string;
}> = ({onSubmit, type, label}) => {
  const [cardType, setCardType] = useState<string | null>(null);
  const navigation: any = useNavigation();
  const paymentMethods = useAppSelector(
    state => state.paymentMethod.paymentMethods,
  );
  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);
  const [error, setError] = useState<null | string>(null);
  const route: any = useRoute();

  return (
    <Formik
      validationSchema={cardSchema}
      initialValues={{
        name: `${firstName.toUpperCase()} ${lastName.toUpperCase()}`,
        cardNumber: '',
        expirationDate: '',
        csc: '',
        firstName: firstName,
        lastName: lastName,
        address: '',
        city: '',
        state: '',
        postalCode: '',
        phone: '',
      }}
      onSubmit={values =>
        onSubmit({
          ...values,
          paymentMethod: type,
          cardType: cardType !== null ? cardType : 'Unknown',
          label,
        })
      }>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
        setFieldTouched,
        setFieldValue,
      }) => {
        const checkType = () => {
          setCardType(setCard(values.cardNumber));
        };

        const checkAllCards = () => {
          setError(null);
          paymentMethods.creditCard.map(
            (item: any) =>
              item.cardNumber === values.cardNumber &&
              setError(
                'You have entered a credit card that is already linked. Please re-enter your credit card information or visit my account > settings > payment methods to review your linked cards',
              ),
          );
        };

        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.container}>
            <Subtitle style={styles.mainTitle}>Card Information</Subtitle>
            <FormInput
              label="Name on Card"
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
              label="Card Number"
              plaseholder="Your Card Number"
              onChangeText={handleChange('cardNumber')}
              onFocus={() => setFieldTouched('cardNumber', false)}
              onInput={() => {
                checkType();
                setFieldValue(
                  'cardNumber',
                  cardInputValidation(values.cardNumber),
                );
              }}
              maxLength={19}
              keyboardType="numeric"
              value={values.cardNumber}
              onBlur={async () => {
                setFieldTouched('cardNumber', true);
                setFieldValue(
                  'cardNumber',
                  cardNumberValidation(values.cardNumber),
                );
                checkType();
                checkAllCards();
              }}
              rightIcon={() =>
                cardType === 'visa' ? (
                  <Visa />
                ) : cardType === 'masterCard' ? (
                  <MasterCard />
                ) : cardType === 'americanExpress' ? (
                  <AmericanExpress />
                ) : cardType === 'discover' ? (
                  <Discover />
                ) : null
              }
              errorMessage={errors.cardNumber}
              isTouched={touched.cardNumber}
            />

            <View style={styles.datePicker}>
              <View style={{width: '50%'}}>
                <DatePicker
                  errorMessage={errors.expirationDate}
                  isTouched={touched.expirationDate}
                  label="Expiration Date"
                  value={values.expirationDate}
                  onConfirm={date => setFieldValue('expirationDate', date)}
                  style={{marginBottom: 21}}
                  showIcon={false}
                  type="card"
                  errorStyle={{left: 0, top: 77}}
                />
              </View>
              <View style={{marginLeft: 10, width: '50%'}}>
                <FormInput
                  label="CSC"
                  onBlur={async () => {
                    await setFieldValue('csc', values.csc.trim());
                    setFieldTouched('csc', true);
                  }}
                  plaseholder="Your CSC"
                  keyboardType="numeric"
                  onInput={() =>
                    setFieldValue('csc', validatePasscode(values.csc))
                  }
                  maxLength={cardType === 'americanExpress' ? 4 : 3}
                  onChangeText={handleChange('csc')}
                  onFocus={() => setFieldTouched('csc', false)}
                  value={values.csc}
                  errorMessage={errors.csc}
                  isTouched={touched.csc}
                />
              </View>
            </View>

            <Subtitle style={styles.mainTitle}>Billing Address</Subtitle>

            <FormInput
              label="First Name"
              onBlur={async () => {
                await setFieldValue('firstName', values.firstName.trim());
                setFieldTouched('firstName', true);
              }}
              plaseholder="Your First Name"
              onChangeText={handleChange('firstName')}
              onFocus={() => setFieldTouched('firstName', false)}
              value={values.firstName}
              errorMessage={errors.firstName}
              isTouched={touched.firstName}
            />

            <FormInput
              label="Last Name"
              onBlur={async () => {
                await setFieldValue('lastName', values.lastName.trim());
                setFieldTouched('lastName', true);
              }}
              plaseholder="Your Last Name"
              onChangeText={handleChange('lastName')}
              onFocus={() => setFieldTouched('lastName', false)}
              value={values.lastName}
              errorMessage={errors.lastName}
              isTouched={touched.lastName}
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
                  onBlur={async () => {
                    await setFieldValue('postalCode', values.postalCode.trim());
                    setFieldTouched('postalCode', true);
                  }}
                  onInput={() =>
                    setFieldValue(
                      'postalCode',
                      validatePasscode(values.postalCode),
                    )
                  }
                  plaseholder="Your Postal Code"
                  keyboardType="numeric"
                  onChangeText={handleChange('postalCode')}
                  onFocus={() => setFieldTouched('postalCode', false)}
                  value={values.postalCode}
                  errorMessage={errors.postalCode}
                  isTouched={touched.postalCode}
                />
              </View>
            </View>

            <FormInput
              label="Phone"
              onBlur={async () => {
                await setFieldValue('phone', values.phone.trim());
                setFieldTouched('phone', true);
              }}
              plaseholder="Your Phone"
              onChangeText={handleChange('phone')}
              onFocus={() => setFieldTouched('phone', false)}
              value={values.phone}
              keyboardType="phone-pad"
              errorMessage={errors.phone}
              isTouched={touched.phone}
            />

            <View style={styles.buttons}>
              {error && (
                <Error style={{marginBottom: 32, textAlign: 'left'}}>
                  {error}
                </Error>
              )}
              <TextButton
                style={{marginBottom: 20}}
                solid
                disabled={
                  error ||
                  !isValid ||
                  cardType === 'Unknown' ||
                  (cardType === 'americanExpress' && values.csc.length < 4)
                }
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
