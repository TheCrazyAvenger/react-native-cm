import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Screens} from '@constants';
import {styles} from './styles';
import {
  CheckBoxItem,
  DatePicker,
  FormInput,
  ItemPicker,
  PaymentMethodPicker,
} from '@components';
import {getNextDay, getNextYear, validateNumbers} from '@utilities';
import {Description, TitleMedium, Error} from '@Typography';
import {TextButton} from '@ui';
import * as yup from 'yup';

const autoBuySchema = yup.object().shape({
  startDate: yup.string().required('Please enter Start Date'),
  endDate: yup
    .string()
    .notOneOf([yup.ref('startDate')], 'Start Date must come before End Date')
    .label('End Date')
    .required('Please enter End Date'),
  frequency: yup.string().required('Please enter Frequency'),
  amount: yup
    .number()
    .required('Please enter amount')
    .min(1, 'Minimum purchase amount is .001 ounces.'),
});

export const AutoBuySetUpForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {type, prevValues} = route.params;
  const {data} = route.params;

  const newDate = new Date();

  const currentDate: any =
    newDate.getHours() > 16
      ? getNextDay(newDate)
      : newDate.toLocaleDateString();

  const schema =
    type === 'Change'
      ? autoBuySchema.concat(
          yup.object().shape({
            status: yup.string().required('Enter status'),
          }),
        )
      : autoBuySchema;

  const goToNext = (values: {[key: string]: string | number | boolean}) => {
    const {
      amount,
      checkBox,
      endDate,
      frequency,
      status,
      paymentMethod,
      startDate,
    } = values;

    navigation.navigate(Screens.reviewAutoBuy, {
      type: type ? type : null,
      amount,
      status: type ? status : 'Active',
      frequency,
      paymentMethod,
      startDate,
      endDate: !checkBox ? endDate : null,
      metal: type ? prevValues.metal : data.name,
      id: type ? prevValues.id : null,
    });
  };

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        startDate: type ? prevValues.startDate : currentDate,
        endDate:
          type && prevValues.endDate
            ? prevValues.endDate
            : getNextDay(currentDate),
        frequency: type ? prevValues.frequency : 'Daily',
        amount: type ? prevValues.amount : '',
        paymentMethod: type ? prevValues.paymentMethod : 'cashBalance',
        checkBox: type && prevValues.endDate ? false : true,
        status: type && prevValues.status,
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
        const checkDate = (date: string, field: string) => {
          if (new Date(date) < new Date(currentDate)) {
            setFieldValue(field, new Date(currentDate).toLocaleDateString());
          } else {
            setFieldValue(field, date);
          }
          if (
            new Date(date) <= new Date(values.startDate) &&
            field === 'endDate'
          ) {
            const currentDate = new Date(values.startDate);

            setFieldValue('endDate', getNextDay(currentDate));
          }
        };

        return (
          <View style={styles.container}>
            <TitleMedium style={styles.mainTitle}>
              {type ? 'Set Up Auto Buy Changes' : 'Set Up Auto Buy'}
            </TitleMedium>
            {type && (
              <ItemPicker
                label="Status"
                items={[
                  {label: 'Active', value: 'Active'},
                  {label: 'Paused', value: 'Paused'},
                ]}
                errorMessage={errors.status}
                isTouched={touched.status}
                value={values.status}
                onChange={value => setFieldValue('status', value)}
              />
            )}

            <View style={styles.datePicker}>
              <View style={{width: '47%'}}>
                <DatePicker
                  errorMessage={errors.startDate}
                  isTouched={touched.startDate}
                  label="Start Date"
                  value={values.startDate}
                  onConfirm={date => {
                    checkDate(date, 'startDate');
                  }}
                />
              </View>
              <View style={{width: '47%'}}>
                <DatePicker
                  errorMessage={errors.endDate}
                  isTouched={touched.endDate}
                  label="End Date"
                  value={values.endDate}
                  disabled={values.checkBox}
                  onConfirm={date => checkDate(date, 'endDate')}
                />
                <CheckBoxItem
                  value={values.checkBox}
                  isTouched={touched.checkBox}
                  error={errors.checkBox}
                  containerStyle={{alignItems: 'center'}}
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
              errorMessage={errors.frequency}
              isTouched={touched.frequency}
              value={values.frequency}
              onChange={value => setFieldValue('frequency', value)}
            />

            <Description style={styles.title}>
              {data ? data.metal : null} Amount
            </Description>
            <FormInput
              onBlur={() => setFieldTouched('amount', true)}
              plaseholder="0.00"
              leftPrefix="$"
              onInput={() =>
                setFieldValue('amount', validateNumbers(values.amount))
              }
              keyboardType="numeric"
              onChangeText={handleChange('amount')}
              onFocus={() => setFieldTouched('amount', false)}
              value={`${values.amount}`}
              errorMessage={errors.amount}
              isTouched={touched.amount}
            />

            <PaymentMethodPicker
              label="Payment Method"
              onChange={(value: any) => setFieldValue('paymentMethod', value)}
            />

            <View style={{marginHorizontal: 10, marginTop: 30}}>
              <TextButton
                style={{marginBottom: 20}}
                title="Continue"
                disabled={values.amount === ''}
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
