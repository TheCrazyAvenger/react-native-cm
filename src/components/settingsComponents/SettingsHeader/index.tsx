import React from 'react';
import {View} from 'react-native';
import {colors} from '@constants';
import {useAppSelector} from '@hooks';
import {Description, TitleMedium} from '@Typography';
import {styles} from './styles';

export const SettingsHeader: React.FC = () => {
  const email = useAppSelector(state => state.auth.userEmail);
  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);
  const verified = useAppSelector(state => state.auth.verified);

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 25, maxWidth: '70%'}}>
        <TitleMedium numberOfLines={1} style={styles.userName}>
          {firstName} {lastName}
        </TitleMedium>
        <Description numberOfLines={1} style={{color: colors.primary}}>
          {email}
        </Description>
      </View>
      <View
        style={{
          ...styles.verified,
          borderColor: verified ? 'green' : colors.red,
        }}>
        <Description style={{color: verified ? 'green' : colors.red}}>
          {verified ? 'Verified' : 'Unverified'}
        </Description>
      </View>
    </View>
  );
};
