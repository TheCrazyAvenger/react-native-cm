import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Screens} from '../../../constants';
import {styles} from './styles';
import {DatePicker, FormInput, ItemPicker} from '../../../components';
import {Subtitle, TitleMedium} from '../../../components/Typography';
import {TextButton} from '../../../ui';
import {cardNumberValidation, setCard, states} from '../../../utilities';
import {cardSchema} from '../..';
import {
  AmericanExpress,
  Discover,
  MasterCard,
  Visa,
} from '../../../assets/images/settings';

export const CardForm: React.FC<{
  onSubmit: (...args: any) => void;
  type: string;
}> = ({onSubmit, type}) => {
  const [cardType, setCardType] = useState<string | null>(null);
  const navigation: any = useNavigation();
  const route: any = useRoute();

  return (
    <Formik
      validationSchema={cardSchema}
      initialValues={{
        name: '',
        cardNumber: '',
        expirationDate: '',
        csc: '',
        firstName: '',
        lastName: '',
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
        })
      }>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
      }) => {
        const checkType = () => {
          setCardType(setCard(values.cardNumber));
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
              onBlur={() => setFieldTouched('name', true)}
              errorMessage={errors.name}
              isTouched={touched.name}
            />

            <FormInput
              label="Card Number"
              plaseholder="Your Card Number"
              onChangeText={handleChange('cardNumber')}
              onFocus={() => setFieldTouched('cardNumber', false)}
              onInput={checkType}
              value={values.cardNumber}
              onBlur={async () => {
                setFieldTouched('cardNumber', true);
                setFieldValue(
                  'cardNumber',
                  cardNumberValidation(values.cardNumber),
                );
                checkType();
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
                  onBlur={() => setFieldTouched('csc', true)}
                  plaseholder="Your CSC"
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
              onBlur={() => setFieldTouched('firstName', true)}
              plaseholder="Your First Name"
              onChangeText={handleChange('firstName')}
              onFocus={() => setFieldTouched('firstName', false)}
              value={values.firstName}
              errorMessage={errors.firstName}
              isTouched={touched.firstName}
            />

            <FormInput
              label="Last Name"
              onBlur={() => setFieldTouched('lastName', true)}
              plaseholder="Your Last Name"
              onChangeText={handleChange('lastName')}
              onFocus={() => setFieldTouched('lastName', false)}
              value={values.lastName}
              errorMessage={errors.lastName}
              isTouched={touched.lastName}
            />

            <FormInput
              label="Street Address"
              onBlur={() => setFieldTouched('address', true)}
              plaseholder="Your Street Address"
              onChangeText={handleChange('address')}
              onFocus={() => setFieldTouched('address', false)}
              value={values.address}
              errorMessage={errors.address}
              isTouched={touched.address}
            />

            <FormInput
              label="City"
              onBlur={() => setFieldTouched('city', true)}
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
              <View style={{width: '43%'}}>
                <FormInput
                  label="Postal Code"
                  onBlur={() => setFieldTouched('postalCode', true)}
                  plaseholder="Your Postal Code"
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
              onBlur={() => setFieldTouched('phone', true)}
              plaseholder="Your Phone"
              onChangeText={handleChange('phone')}
              onFocus={() => setFieldTouched('phone', false)}
              value={values.phone}
              errorMessage={errors.phone}
              isTouched={touched.phone}
            />

            <View style={styles.buttons}>
              <TextButton
                style={{marginBottom: 20}}
                solid
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
