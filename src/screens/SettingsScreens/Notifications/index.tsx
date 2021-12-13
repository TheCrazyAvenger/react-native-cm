import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {News, Promotions, TransactionsUpdate} from '@assets/images/settings';
import {MenuItem} from '@components';
import {Screen} from '@ui';
import database from '@react-native-firebase/database';
import {setNotification} from '@store/slices/authSlice';
import {useAppDispatch, useAppSelector} from '@hooks';

export const Notifications: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const [loading, setLoading] = useState(false);

  const token = useAppSelector(state => state.auth.token);
  const notifications = useAppSelector(state => state.auth.notifications);
  const dispatch = useAppDispatch();

  const {transactions, promotions, marketNews} = notifications;

  const changeCondition = async (value: boolean, notification: string) => {
    try {
      setLoading(true);
      await database()
        .ref(`/users/${token}/notifications/${notification}`)
        .set(value);
      await dispatch(setNotification({notification, value}));
      await setLoading(false);
    } catch (e) {
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
      <View style={{marginTop: 33}}>
        <MenuItem
          title="Transaction Updates"
          description="Get notified when market prices are on the move"
          onPress={() => changeCondition(!transactions, 'transactions')}
          Image={TransactionsUpdate}
          type="switch"
          disabledSwitch={loading}
          switchValue={transactions}
        />
        <MenuItem
          title="Promotions"
          description="Receive promotions and special offers from CyberMetals"
          onPress={() => changeCondition(!promotions, 'promotions')}
          Image={Promotions}
          type="switch"
          disabledSwitch={loading}
          switchValue={promotions}
        />
        <MenuItem
          title={'Market News & Updates'}
          description="Keep up to date on the latest precious metals market news"
          onPress={() => changeCondition(!marketNews, 'marketNews')}
          Image={News}
          style={{marginBottom: 50}}
          type="switch"
          disabledSwitch={loading}
          switchValue={marketNews}
        />
      </View>
    </Screen>
  );
};
