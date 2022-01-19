import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {AutoBuyInfo} from '@components';
import {TitleMedium} from '@Typography';
import {Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {addAutoBuy, updateAutoBuy} from '@store/slices/autoBuySlice';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import database from '@react-native-firebase/database';

export const ReviewAutoBuy: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [loading, setLoading] = useState(false);
  const token = useAppSelector(state => state.auth.token);

  const {type, account} = route.params;
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
    usedAmount,
  } = route.params;

  const goToNext = async () => {
    try {
      setLoading(true);
      const data = {
        amount,
        frequency,
        paymentMethod,
        startDate,
        endDate,
        account,
        status,
        usedAmount,
        metal,
        id: type ? id : `${Math.round(Math.random() * 1000000)}_${metal}`,
      };

      await database().ref(`/users/${token}/autoBuy/${data.id}`).set(data);
      if (type) {
        await dispatch(updateAutoBuy(data));
      } else {
        await dispatch(addAutoBuy(data));
      }

      await setLoading(false);

      navigation.replace(Screens.completeAutoBuy, {
        type: type ? type : null,
        amount,
        account,
        frequency,
        paymentMethod,
        startDate,
        endDate,
        status,
        usedAmount,
        metal,
      });
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

        <AutoBuyInfo
          metal={metal}
          amount={amount}
          usedAmount={usedAmount}
          frequency={frequency}
          paymentMethod={paymentMethod}
          startDate={startDate}
          endDate={endDate}
          account={account}
        />

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
