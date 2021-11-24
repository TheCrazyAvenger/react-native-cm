import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';
import {
  News,
  PaymentMethods,
  Promotions,
  TransactionsUpdate,
} from '../../../assets/images/settings';

import {MenuItem} from '../../../components';

import {Screen} from '../../../ui';

export const Notifications: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const [transaction, setTransaction] = useState(false);
  const [promotions, setPromotions] = useState(false);
  const [news, setNews] = useState(false);

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
          onPress={() => setTransaction(prev => !prev)}
          Image={TransactionsUpdate}
          type="switch"
          switchValue={transaction}
        />
        <MenuItem
          title="Promotions"
          description="Receive promotions and special offers from CyberMetals"
          onPress={() => setPromotions(prev => !prev)}
          Image={Promotions}
          type="switch"
          switchValue={promotions}
        />
        <MenuItem
          title={'Market News & Updates'}
          description="Keep up to date on the latest precious metals market news"
          onPress={() => setNews(prev => !prev)}
          Image={News}
          style={{marginBottom: 50}}
          type="switch"
          switchValue={news}
        />
      </View>
    </Screen>
  );
};
