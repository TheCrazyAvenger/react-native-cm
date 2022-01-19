import React from 'react';
import {View} from 'react-native';
import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {Description, TitleMedium} from '@Typography';
import {styles} from './styles';
import {VerificationItem} from '../VerificationItem';

export const SettingsHeader: React.FC = () => {
  const email = useAppSelector(state => state.auth.userEmail);
  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <TitleMedium numberOfLines={1} style={styles.userName}>
          {firstName} {lastName}
        </TitleMedium>
        <Description numberOfLines={1} style={{color: colors.primary}}>
          {email}
        </Description>
      </View>
      <VerificationItem />
    </View>
  );
};
