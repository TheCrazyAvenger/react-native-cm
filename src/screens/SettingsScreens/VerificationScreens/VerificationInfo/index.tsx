import React from 'react';
import {Screen, TextButton} from '@ui';
import {View} from 'react-native';
import {SubtitleMedium} from '@Typography';
import {useAppSelector} from '@hooks';
import {styles} from './styles';
import {Screens} from '@constants';
import {useNavigation} from '@react-navigation/core';
import {VerificationItem} from '@components';

export const VerificationInfo: React.FC = () => {
  const navigation: any = useNavigation();

  const verified = useAppSelector(state => state.auth.verified);

  return (
    <Screen style={styles.container} type="View">
      <View style={styles.header}>
        <VerificationItem />
        <SubtitleMedium style={styles.text}>
          {verified
            ? 'Congratulation! Your account is verified. You can request funds or request delivery of precious metals at any time.'
            : 'Your account is not yet verified. You must complete the account verification process before withdrawing funds or requesting delivery of physical precious metals.'}
        </SubtitleMedium>
      </View>

      <TextButton
        solid
        disabled={verified}
        title="Verify"
        style={{marginBottom: 25}}
        onPress={() => navigation.navigate(Screens.verification)}
      />
    </Screen>
  );
};
