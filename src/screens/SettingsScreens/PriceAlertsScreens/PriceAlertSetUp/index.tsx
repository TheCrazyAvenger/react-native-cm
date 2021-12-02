import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {LoadingItem, Wrapper} from '@components';
import {Subtitle, SubtitleMedium} from '@Typography';
import {colors} from '@constants';
import {PriceAlertsSetUpForm} from '../../../../forms';
import {useAppDispatch, useAppSelector} from '@hooks';
import {addAlert, updatePriceAlerts} from '@store/slices/priceAlertSlice';
import {Screen} from '@ui';
import {metals} from '@utilities';
import {styles} from './styles';
import database from '@react-native-firebase/database';
import {setLoading} from '@store/slices/authSlice';

export const PriceAlertSetUp: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const loading = useAppSelector(state => state.auth.loading);
  const token = useAppSelector(state => state.auth.token);
  const priceAlerts = useAppSelector(state => state.priceAlerts.priceAlerts);
  const dispatch = useAppDispatch();

  const {id, type, prevValues} = route.params;

  const metalType = metals[type ? prevValues.id - 1 : id - 1];

  const {Image, metal, color, backgroundColor, price} = metalType;

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
      id: type ? prevValues.id : priceAlerts[metal].length + 1,
    };

    dispatch(setLoading(true));

    await database()
      .ref(`/users/${token}/priceAlerts/${data.metal}/${data.id}`)
      .set(data);
    if (type) {
      await dispatch(updatePriceAlerts(data));
      await dispatch(setLoading(false));
      navigation.pop();
    } else {
      await dispatch(addAlert(data));
      await dispatch(setLoading(false));
      navigation.pop(2);
    }
  };

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{...styles.image, backgroundColor: backgroundColor}}>
              <Image />
            </View>
            <Subtitle style={{...styles.title, color: color}}>{metal}</Subtitle>
          </View>

          <View>
            <SubtitleMedium style={{...styles.title, color: colors.black}}>
              {price}
            </SubtitleMedium>
          </View>
        </View>
        <Wrapper
          style={{
            backgroundColor: colors.primary,
            marginTop: 10,
            marginBottom: 16,
          }}
        />
        <PriceAlertsSetUpForm onSubmit={goToNext} metal={metal} />
      </View>
    </Screen>
  );
};
