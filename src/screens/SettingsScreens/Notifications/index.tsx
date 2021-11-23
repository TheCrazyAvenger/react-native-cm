import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import {News} from '../../../assets/images/settings/notifications';
import {MenuItem, Wrapper} from '../../../components';
import {
  Description,
  SubtitleMedium,
  TitleMedium,
} from '../../../components/Typography';
import {colors} from '../../../constants';

import {Screen, TextButton} from '../../../ui';
import {styles} from './styles';

export const ReviewAutoBuy: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const [transaction, setTransaction] = useState(false);

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      {/* <MenuItem
        title="Secure with Touch ID"
        description="Set up a passcode to access CyberMetals without having to type your password"
        onPress={() => setTransaction(prev => !prev)}
        Image={News}
        type="switch"
        switchValue={transaction}
      />
      <MenuItem
        title="Secure With a Face ID"
        description="Set up a passcode to access CyberMetals without having to type your password"
        onPress={() => setFaceId(prev => !prev)}
        Image={FaceID}
        type="switch"
        switchValue={faceId}
      />
      <MenuItem
        title="Secure With a Passcode"
        description="Set up a passcode to access CyberMetals without having to type your password"
        onPress={() => setPasscode(prev => !prev)}
        Image={News}
        style={{marginBottom: 50}}
        type="switch"
        switchValue={passcode}
      /> */}
    </Screen>
  );
};
