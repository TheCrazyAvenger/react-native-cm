import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {priceAlertsSchema} from '..';
import {colors, Screens} from '../../constants';
import {styles} from './styles';
import {ItemPicker} from '../../components';

import {SubtitleMedium, Error} from '../../components/Typography';
import {TextButton} from '../../ui';
import {Input} from 'react-native-elements';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {addAlert, updatePriceAlerts} from '../../store/slices/priceAlertSlice';

export const PriceAlertsSetUpForm: React.FC<{[key: string]: string}> = ({
  metal,
  color,
  backgroundColor,
}) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const dispatch = useAppDispatch();
  const priceAlerts = useAppSelector(state => state.priceAlerts.priceAlerts);

  const {type, prevValues} = route.params;

  const goToNext = async (values: {[key: string]: string | number}) => {
    const {condition, value} = values;

    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;

    const data = {
      metal: type ? prevValues.metal : metal,
      color: type ? prevValues.color : color,
      backgroundColor: type ? prevValues.backgroundColor : backgroundColor,
      condition,
      value,
      date: type ? prevValues.date : date.toLocaleDateString(),
      time: type ? prevValues.time : time,
      id: type ? prevValues.id : priceAlerts.length + 1,
    };

    if (type) {
      await dispatch(updatePriceAlerts(data));
      navigation.pop();
    } else {
      await dispatch(addAlert(data));
      navigation.pop(2);
    }
  };

  return (
    <Formik
      validationSchema={priceAlertsSchema}
      initialValues={{
        condition: type ? prevValues.condition : 'Decreases By',
        value: type ? prevValues.value : 0.5,
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
            <View style={{marginBottom: 16}}>
              <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
                Alert me when 1 oz of {metal}
              </SubtitleMedium>
            </View>
            <ItemPicker
              style={{marginHorizontal: 0, width: '75%', marginBottom: 20}}
              value={values.condition}
              items={[
                {
                  label: 'Decreases By %',
                  value: 'Decreases By',
                },
                {
                  label: 'Increases By %',
                  value: 'Increases By',
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
                style={{textAlign: 'center'}}
                value={`${values.value}`}
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
