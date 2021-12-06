import {useNavigation, useRoute} from '@react-navigation/core';
import {Formik} from 'formik';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {colors, Screens} from '@constants';
import {styles} from './styles';
import {CheckBoxItem, LoadingItem} from '@components';
import {SubtitleMedium} from '@Typography';
import {TextButton} from '@ui';

import {reviewBuySchema} from '../..';
import {getMonth} from '@utilities';
import {useAppDispatch, useAppSelector} from '@hooks';
import {
  setLoading,
  updateCash,
  updateOwnedMetals,
} from '@store/slices/authSlice';
import database from '@react-native-firebase/database';
import {addOperation} from '@store/slices/operationsSlice';

export const ReviewBuyForm: React.FC<{operationType: string}> = ({
  operationType,
}) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const {amount, amountOz, frequency, paymentMethod, data} = route.params;
  const {name, id: metalId, spot} = data;
  const {type} = route.params;

  const operations = useAppSelector(state => state.operations.operations);
  const loading = useAppSelector(state => state.auth.loading);
  const token = useAppSelector(state => state.auth.token);
  const cashBalance = useAppSelector(state => state.auth.cashBalance);
  const ownedMetals = useAppSelector(state => state.auth.ownedMetals);

  const dispatch = useAppDispatch();

  // console.log(type);

  const buyGold = async () => {
    try {
      const date = new Date();
      const month = getMonth(date.getMonth());
      const day = date.getDate();
      const year = date.getFullYear();

      const id = `${Math.round(Math.random() * 1000000)}_${
        type === 'Buy' ? 'buy' : 'sell'
      }`;

      const data = {
        type: `${type === 'Buy' ? 'Bought' : 'Sold'} ${name}`,
        date: `${month} ${day}, ${year}`,
        usd: `${type === 'Buy' ? '-' : '+'} $${amount}`,
        oz: (+amount / 1887).toFixed(3),
        image: `${type === 'Buy' ? 'buy' : 'sell'}`,
        id,
      };

      const sellBuyBody = {
        digital_product_id: metalId,
        quantity: +amountOz,
        user_payment_method_id: 13,
        spot_price: spot,
        customer_price: spot,
        total: +amount,
      };

      dispatch(setLoading(true));

      const newAmount =
        type === 'Buy'
          ? ownedMetals[name] + +amountOz
          : ownedMetals[name] - +amountOz;
      await database()
        .ref(`/users/${token}/ownedMetals/${name}`)
        .set(newAmount);
      await dispatch(updateOwnedMetals({name, newAmount}));

      await database().ref(`/users/${token}/operations/${id}`).set(data);

      await dispatch(addOperation(data));

      const newCashValue =
        paymentMethod !== 'cashBalance'
          ? cashBalance
          : type === 'Buy'
          ? cashBalance - +amount
          : cashBalance + +amount;

      await database()
        .ref(`/users/${token}`)
        .update({cashBalance: newCashValue});
      await dispatch(updateCash(newCashValue));

      await dispatch(setLoading(false));

      navigation.push(Screens.completeSellBuy, {
        type: 'Success',
        operationType,
        data: route.params.data,
        amount,
        frequency,
        paymentMethod,
        amountOz,
      });
    } catch (e) {
      await dispatch(setLoading(false));
      navigation.push(Screens.completeSellBuy, {
        type: 'Error',
        operationType,
        data: route.params.data,
        amount,
        frequency,
        paymentMethod,
        amountOz,
      });
      console.log(e);
    }
  };

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <Formik
      validationSchema={reviewBuySchema}
      initialValues={{
        checkBox: false,
      }}
      onSubmit={() => buyGold()}>
      {({handleSubmit, values, errors, touched, setFieldValue}) => {
        const checkBoxError =
          errors.checkBox && touched.checkBox ? colors.red : colors.black;
        return (
          <View style={styles.container}>
            <CheckBoxItem
              value={values.checkBox}
              isTouched={touched.checkBox}
              onPress={() => setFieldValue('checkBox', !values.checkBox)}
              error={errors.checkBox}>
              <View style={{marginBottom: 20}}>
                <SubtitleMedium style={{width: '85%', color: checkBoxError}}>
                  I agree with the
                </SubtitleMedium>
                <TouchableOpacity style={{width: '95%'}}>
                  <SubtitleMedium style={styles.terms}>
                    CyberMetals Terms and Conditions.
                  </SubtitleMedium>
                </TouchableOpacity>
              </View>
            </CheckBoxItem>
            <View>
              <TextButton
                solid
                disabled={values.checkBox === false}
                style={{marginBottom: 20}}
                title="Confirm Buy"
                onPress={handleSubmit}
              />
              <TextButton
                title="Cancel"
                style={{marginBottom: 5}}
                onPress={() => navigation.pop(2)}
              />
            </View>
          </View>
        );
      }}
    </Formik>
  );
};
