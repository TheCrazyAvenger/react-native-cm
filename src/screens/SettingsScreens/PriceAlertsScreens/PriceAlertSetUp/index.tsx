import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {Wrapper} from '@components';
import {Subtitle, SubtitleMedium} from '@Typography';
import {colors} from '@constants';
import {PriceAlertsSetUpForm} from '../../../../forms';
import {useAppDispatch, useAppSelector} from '@hooks';
import {addAlert, updatePriceAlerts} from '@store/slices/priceAlertSlice';
import {Screen} from '@ui';
import {getMetal, getMetalImage, metals, numberWithCommas} from '@utilities';
import {styles} from './styles';
import database from '@react-native-firebase/database';

export const PriceAlertSetUp: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [loading, setLoading] = useState(false);
  const token = useAppSelector(state => state.auth.token);
  const dispatch = useAppDispatch();

  const {id, type, prevValues, data} = route.params;

  const metalType = metals[type ? getMetal(prevValues.metal) : id - 1];

  const {metal, color, backgroundColor} = metalType;

  const Image = getMetalImage(metal);

  const goToNext = async (values: {[key: string]: string | number}) => {
    try {
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
        id: type
          ? prevValues.id
          : `${Math.round(Math.random() * 1000000)}_${metal}`,
      };

      setLoading(true);

      await database().ref(`/users/${token}/priceAlerts/${data.id}`).set(data);
      if (type) {
        await dispatch(updatePriceAlerts(data));
        await setLoading(false);
        navigation.pop();
      } else {
        await dispatch(addAlert(data));
        await setLoading(false);
        navigation.pop(2);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

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
              {`$${numberWithCommas(Number(data[id - 1].buy).toFixed(2))} USD`}
            </SubtitleMedium>
          </View>
        </View>
        <Wrapper style={styles.wrapper} />
        <PriceAlertsSetUpForm
          onSubmit={goToNext}
          loading={loading}
          metal={metal}
        />
      </View>
    </Screen>
  );
};
