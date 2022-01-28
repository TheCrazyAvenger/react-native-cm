import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React, {useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {colors, Screens} from '@constants';
import {styles} from './styles';
import {
  CheckBoxItem,
  DatePicker,
  FormInput,
  ItemPicker,
  PaymentMethodPicker,
  Wrapper,
} from '@components';
import {getNextDay, removeCommas, validateNumbers} from '@utilities';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
import {TextButton} from '@ui';
import * as yup from 'yup';
import {useAppSelector} from '@hooks';

export const AutoBuySetUpForm: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const cashBalance = useAppSelector(state => state.auth.cashBalance);

  const {type, prevValues} = route.params;
  const {data} = route.params;

  const newDate = new Date();

  const [account, setAccount] = useState('');
  const [usedAmount, setUsedAmount] = useState(
    type && prevValues.usedAmount ? prevValues.usedAmount : 'USD',
  );
  const [pickerVisible, setPickerVisible] = useState(false);

  const autoBuySchema = yup.object().shape({
    startDate: yup.string().required('Please enter Start Date'),
    endDate: yup
      .string()
      .notOneOf([yup.ref('startDate')], 'Start Date must come before End Date')
      .label('End Date')
      .required('Please enter End Date'),
    frequency: yup.string().required('Please enter Frequency'),
    amount: yup
      .string()
      .required('Please enter amount')
      .min(
        usedAmount === 'USD' ? 1 : 0.001,
        'Minimum purchase amount is .001 ounces.',
      ),
  });

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
      amount: removeCommas(amount),
      account,
      usedAmount,
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
        const checkStartDate = (date: string) => {
          if (new Date(date) < new Date(currentDate)) {
            setFieldValue(
              'startDate',
              new Date(currentDate).toLocaleDateString(),
            );
          } else {
            setFieldValue('startDate', date);
          }

          if (new Date(values.endDate) <= new Date(date)) {
            const currentDate = new Date(date);

            setFieldValue('endDate', getNextDay(currentDate));
          }
        };

        const checkEndDate = (date: string) => {
          if (new Date(date) <= new Date(values.startDate)) {
            setFieldValue('endDate', getNextDay(values.startDate));
          } else {
            setFieldValue('endDate', date);
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
                maxHeight={113}
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
                    checkStartDate(date);
                  }}
                />
              </View>
              <View style={{width: '47%'}}>
                <DatePicker
                  errorMessage={errors.endDate}
                  isTouched={touched.endDate}
                  label="End Date"
                  style={{marginBottom: -25}}
                  value={values.endDate}
                  disabled={values.checkBox}
                  onConfirm={date => {
                    checkEndDate(date);
                  }}
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
              {data ? data.name : null} Amount
            </Description>
            <FormInput
              onBlur={() => setFieldTouched('amount', true)}
              plaseholder="0.00"
              leftPrefix={usedAmount === 'USD' ? '$' : null}
              onInput={() =>
                setFieldValue('amount', validateNumbers(values.amount))
              }
              rightIcon={() => (
                <View>
                  <TouchableOpacity
                    onPress={() => setPickerVisible(true)}
                    style={styles.amount}>
                    <Description style={styles.amountTitle}>
                      {usedAmount}
                    </Description>
                    <Image
                      style={{marginLeft: 8}}
                      source={require('@assets/images/settings/downIcon.png')}
                    />
                  </TouchableOpacity>
                  {pickerVisible && (
                    <View style={styles.amountPicker}>
                      <TouchableOpacity
                        onPress={() => {
                          setUsedAmount('USD');
                          setPickerVisible(false);
                        }}>
                        <SubtitleMedium
                          style={{
                            color:
                              usedAmount === 'USD' ? colors.gray : colors.black,
                          }}>
                          USD
                        </SubtitleMedium>
                      </TouchableOpacity>
                      <Wrapper style={styles.pickerWrap} />
                      <TouchableOpacity
                        onPress={() => {
                          setUsedAmount('OZ');
                          setPickerVisible(false);
                        }}>
                        <SubtitleMedium
                          style={{
                            color:
                              usedAmount === 'OZ' ? colors.gray : colors.black,
                          }}>
                          OZ
                        </SubtitleMedium>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
              keyboardType="numeric"
              onChangeText={handleChange('amount')}
              onFocus={() => setFieldTouched('amount', false)}
              value={`${values.amount}`}
              errorMessage={errors.amount}
              isTouched={touched.amount}
            />

            <PaymentMethodPicker
              setPaymentType={value => setAccount(value)}
              label="Payment Method"
              method={type && prevValues.paymentMethod}
              account={type && prevValues.account}
              onChange={(value: any) => setFieldValue('paymentMethod', value)}
            />

            <View style={{marginHorizontal: 10, marginTop: 30}}>
              <TextButton
                changeDisabledStyle={true}
                disabledStyle={{
                  backgroundColor:
                    (values.paymentMethod === 'cashBalance' &&
                      cashBalance < +values.amount) ||
                    (values.paymentMethod === 'cashBalance' &&
                      usedAmount === 'OZ' &&
                      cashBalance < +values.amount * 1887)
                      ? '#F39A9A'
                      : '#C1D9FA',
                }}
                disabledTitle={
                  (values.paymentMethod === 'cashBalance' &&
                    cashBalance < +values.amount) ||
                  (values.paymentMethod === 'cashBalance' &&
                    usedAmount === 'OZ' &&
                    cashBalance < +values.amount * 1887)
                    ? 'Insufficient Funds'
                    : null
                }
                style={{marginBottom: 20}}
                title="Continue"
                disabled={
                  values.amount === '' ||
                  (!account && values.paymentMethod !== 'cashBalance') ||
                  (values.paymentMethod === 'cashBalance' &&
                    cashBalance < +values.amount) ||
                  (values.paymentMethod === 'cashBalance' &&
                    usedAmount === 'OZ' &&
                    cashBalance < +values.amount * 1887)
                }
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
