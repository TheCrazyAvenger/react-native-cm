import {useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import * as yup from 'yup';
import {colors} from '@constants';
import {styles} from './styles';
import {ItemPicker} from '@components';
import {SubtitleMedium, Error} from '@Typography';
import {TextButton} from '@ui';
import {Input} from 'react-native-elements';

const priceAlertsSchema = yup.object().shape({
  condition: yup.string().required('Please enter Condition'),
  value: yup
    .number()
    .required('Please enter value')
    .min(0.5, 'At least 0.5%')
    .max(100, 'Only 100%'),
});

export const PriceAlertsSetUpForm: React.FC<any> = ({
  metal,
  onSubmit,
  loading,
}) => {
  const route: any = useRoute();

  const {type, prevValues} = route.params;

  return (
    <Formik
      validationSchema={priceAlertsSchema}
      initialValues={{
        condition: type ? prevValues.condition : 'Decreases By %',
        value: type ? prevValues.value : '0.5',
      }}
      onSubmit={values => onSubmit(values)}>
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
        return (
          <View style={styles.container}>
            <View style={{marginBottom: 16}}>
              <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
                Notify me when 1 oz of {metal}
              </SubtitleMedium>
            </View>

            <ItemPicker
              style={{marginHorizontal: 0, width: '75%', marginBottom: 20}}
              value={values.condition}
              maxHeight={340}
              items={[
                {
                  label: 'Decreases By %',
                  value: 'Decreases By %',
                },
                {
                  label: 'Increases By %',
                  value: 'Increases By %',
                },
                {
                  label: 'Decreases By $',
                  value: 'Decreases By $',
                },
                {
                  label: 'Increases By $',
                  value: 'Increases By $',
                },
                {
                  label: 'Falls Below $',
                  value: 'Falls Below $',
                },
                {
                  label: 'Rises Above $',
                  value: 'Rises Above $',
                },
              ]}
              onChange={value => setFieldValue('condition', value)}
            />
            <View>
              <Input
                containerStyle={styles.inputContainer}
                inputContainerStyle={{
                  borderBottomColor:
                    errors.value && touched.value ? colors.red : colors.gray,
                }}
                textAlign="center"
                value={values.value}
                onChangeText={handleChange('value')}
                onFocus={() => setFieldTouched('value', false)}
                onBlur={() => setFieldTouched('value', true)}
                inputStyle={styles.inputStyle}
              />
              {errors.value && touched.value && (
                <Error style={styles.error}>{errors.value}</Error>
              )}
            </View>

            <TextButton
              loading={loading}
              disabled={loading || !isValid}
              title={type ? 'Edit Alert' : 'Create Alert'}
              solid
              style={{marginBottom: 10}}
              onPress={handleSubmit}
            />
          </View>
        );
      }}
    </Formik>
  );
};
