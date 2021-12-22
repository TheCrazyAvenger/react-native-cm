import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {LoadingItem, Wrapper} from '@components';
import {Description, SubtitleMedium, TitleMedium} from '@Typography';
import {colors, Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {addAutoBuy, updateAutoBuy} from '@store/slices/autoBuySlice';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import database from '@react-native-firebase/database';
import {getPaymentName, numberWithCommas} from '@utilities';

export const ReviewAutoBuy: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [loading, setLoading] = useState(false);
  const token = useAppSelector(state => state.auth.token);

  const {type} = route.params;
  const dispatch = useAppDispatch();

  const {
    metal,
    amount,
    endDate,
    frequency,
    paymentMethod,
    startDate,
    status,
    id,
  } = route.params;

  const goToNext = async () => {
    try {
      navigation.navigate(Screens.completeAutoBuy, {
        type: type ? type : null,
        amount,
        frequency,
        paymentMethod,
        startDate,
        endDate,
        status,
        metal,
      });

      const data = {
        amount,
        frequency,
        paymentMethod,
        startDate,
        endDate,
        status,
        metal,
        id: type ? id : `${Math.round(Math.random() * 1000000)}_${metal}`,
      };

      setLoading(true);

      await database().ref(`/users/${token}/autoBuy/${data.id}`).set(data);
      if (type) {
        await dispatch(updateAutoBuy(data));
      } else {
        await dispatch(addAutoBuy(data));
      }
      setLoading(false);
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
        <TitleMedium style={styles.title}>
          Review Auto Buy {type ? 'Changes' : null}
        </TitleMedium>

        <View style={styles.reviewItem}>
          <View style={styles.reviewInfo}>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Buying
            </Description>
            <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
              {metal}
            </SubtitleMedium>
          </View>
          <View style={styles.reviewInfo}>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Amount
            </Description>
            <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
              {`$${numberWithCommas(Number(amount).toFixed(2))}`}
            </SubtitleMedium>
          </View>
          <View style={styles.reviewInfo}>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Payment Method
            </Description>
            <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
              {getPaymentName(paymentMethod)}
            </SubtitleMedium>
          </View>
        </View>

        <Wrapper
          style={{
            backgroundColor: colors.primary,
            marginTop: 0,
            marginBottom: 20,
          }}
        />

        <View style={styles.reviewItem}>
          <View style={styles.reviewInfo}>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Start Date
            </Description>
            <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
              {startDate}
            </SubtitleMedium>
          </View>
          {endDate && (
            <View style={styles.reviewInfo}>
              <Description style={{color: colors.gray, marginBottom: 4}}>
                End Date
              </Description>
              <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
                {endDate}
              </SubtitleMedium>
            </View>
          )}
          <View style={styles.reviewInfo}>
            <Description style={{color: colors.gray, marginBottom: 4}}>
              Frequency
            </Description>
            <SubtitleMedium style={{fontFamily: 'OpenSans-SemiBold'}}>
              {frequency}
            </SubtitleMedium>
          </View>
        </View>

        <View style={{marginBottom: 24}}>
          <SubtitleMedium style={{color: colors.gray}}>
            The price provided is an estimate only. The actual price charged
            will be based on CyberMetals’ spot price and premium for each
            product at the time the order is executed. All transactions will be
            executed between 5:00 p.m. EST and 6:00 p.m. EST on the day your
            Auto Buy is scheduled.
          </SubtitleMedium>
        </View>

        <View>
          <TextButton
            solid
            loading={loading}
            disabled={loading}
            style={{marginBottom: 20}}
            title="Confirm Auto Buy"
            onPress={() => goToNext()}
          />
          <TextButton
            title="Cancel"
            style={{marginBottom: 5}}
            onPress={() => navigation.pop(2)}
          />
        </View>
      </View>
    </Screen>
  );
};
