import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {autoBuySchema} from '..';
import {Screens} from '../../constants';
import {styles} from './styles';
import {
  CheckBoxItem,
  DatePicker,
  FormInput,
  ItemPicker,
} from '../../components';
import {getNextYear} from '../../utilities';
import {
  Description,
  SubtitleMedium,
  TitleMedium,
} from '../../components/Typography';
import {TextButton} from '../../ui';
import {CashBalance} from '../../assets/images/settings';

export const AutoBuySetUpForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {type, prevValues} = route.params;
  const {data} = route.params;

  const goToNext = (values: {[key: string]: string | number | boolean}) => {
    const {amount, checkBox, endDate, frequency, paymentMethod, startDate} =
      values;

    navigation.navigate(Screens.reviewAutoBuy, {
      type: type ? type : null,
      amount,
      frequency,
      paymentMethod,
      startDate,
      endDate: !checkBox ? endDate : null,
      metal: type ? prevValues.metal : data.metal,
      id: type ? prevValues.id : null,
    });
  };

  return (
    <Formik
      validationSchema={autoBuySchema}
      initialValues={{
        startDate: type
          ? prevValues.startDate
          : `${new Date().toLocaleDateString()}`,
        endDate: type ? prevValues.endDate : getNextYear(),
        frequency: type ? prevValues.frequency : 'Daily',
        amount: type ? prevValues.amount : 100,
        paymentMethod: type ? prevValues.paymentMethod : 'Cash Balance',
        checkBox: type && prevValues.endDate ? false : !type ? false : true,
      }}
      onSubmit={values => goToNext(values)}>
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldTouched,
        setFieldValue,
      }) => {
        return (
          <View style={styles.container}>
            <TitleMedium style={styles.mainTitle}>
              Set Up Auto Buy {type ? 'Changes' : null}
            </TitleMedium>
            <View style={styles.datePicker}>
              <View style={{width: '47%'}}>
                <DatePicker
                  errorMessage={errors.startDate}
                  isTouched={touched.startDate}
                  label="Start Date"
                  value={values.startDate}
                  onConfirm={date => setFieldValue('startDate', date)}
                />
              </View>
              <View style={{width: '47%'}}>
                <DatePicker
                  errorMessage={errors.endDate}
                  isTouched={touched.endDate}
                  label="End Date"
                  value={values.endDate}
                  disabled={values.checkBox}
                  onConfirm={date => setFieldValue('endDate', date)}
                />
                <CheckBoxItem
                  value={values.checkBox}
                  isTouched={touched.checkBox}
                  error={errors.checkBox}
                  onPress={() => setFieldValue('checkBox', !values.checkBox)}
                  style={{marginLeft: 0, marginRight: 0}}>
                  <Description>No End Date</Description>
                </CheckBoxItem>
              </View>
            </View>

            <ItemPicker
              label="Frequency"
              items={[
                {label: 'One-Time Purchase', value: 'One-Time Purchase'},
                {label: 'Daily', value: 'Daily'},
                {label: 'Weekly', value: 'Weekly'},
                {label: 'Bi-weekly', value: 'Bi-weekly'},
                {label: 'Monthly', value: 'Monthly'},
              ]}
              value={values.frequency}
              onChange={value => setFieldValue('frequency', value)}
            />

            <Description style={styles.title}>
              {data ? data.metal : null} Amount
            </Description>
            <FormInput
              plaseholder="Your amount ($)"
              onChangeText={handleChange('amount')}
              onFocus={() => setFieldTouched('amount', false)}
              value={`${values.amount}`}
              errorMessage={errors.amount}
              isTouched={touched.amount}
            />

            <Description style={styles.title}>Payment Method</Description>
            <TouchableOpacity
              style={styles.paymentMethod}
              activeOpacity={0.7}
              onPress={() => console.log('Choose payment method')}>
              <View style={{marginRight: 12}}>
                <CashBalance />
              </View>
              <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
                Cash Balance: $54.80
              </SubtitleMedium>
            </TouchableOpacity>

            <View style={{marginHorizontal: 10}}>
              <TextButton
                style={{marginBottom: 20}}
                title="Continue"
                solid
                onPress={handleSubmit}
              />
              <TextButton title="Cancel" onPress={() => navigation.pop()} />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};
