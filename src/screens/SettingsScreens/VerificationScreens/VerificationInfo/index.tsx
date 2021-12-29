import React from 'react';
import {Screen, TextButton} from '@ui';
import {ScrollView, View} from 'react-native';
import {Description, SubtitleMedium} from '@Typography';
import {useAppSelector} from '@hooks';
import {styles} from './styles';
import {colors, Screens} from '@constants';
import {useNavigation} from '@react-navigation/core';

export const VerificationInfo: React.FC = () => {
  const navigation: any = useNavigation();

  const verified = useAppSelector(state => state.auth.verified);

  return (
    <Screen type="View">
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              ...styles.verified,
              borderColor: verified ? 'green' : colors.red,
            }}>
            <Description style={{color: verified ? 'green' : colors.red}}>
              {verified ? 'Verified' : 'Unverified'}
            </Description>
          </View>
          <SubtitleMedium style={styles.text}>
            {verified
              ? 'Congratulation! Your account is verified. You can request funds or request delivery of precious metals at any time.'
              : 'Your account is not yet verified. You must complete the account verification process before withdrawing funds or requesting delivery of physical precious metals.'}
          </SubtitleMedium>
        </View>
      </ScrollView>
      {!verified && (
        <TextButton
          solid
          title="Verify"
          style={{marginBottom: 25}}
          onPress={() => navigation.navigate(Screens.verification)}
        />
      )}
    </Screen>
  );
};
