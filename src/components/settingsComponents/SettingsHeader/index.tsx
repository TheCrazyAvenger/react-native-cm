import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {colors, Screens} from '../../../constants';
import {useAppSelector} from '../../../hooks/hooks';
import {Description, TitleMedium} from '../../Typography';
import {styles} from './styles';

export const SettingsHeader: React.FC = () => {
  const email = useAppSelector(state => state.auth.userEmail);
  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);
  const verified = useAppSelector(state => state.auth.verified);

  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 25}}>
        <TitleMedium numberOfLines={1} style={styles.userName}>
          {firstName} {lastName}
        </TitleMedium>
        <Description style={{color: colors.primary}}>{email}</Description>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate(Screens.verificationStack)}
        style={{
          ...styles.verified,
          borderColor: verified ? 'green' : colors.red,
        }}>
        <Description style={{color: verified ? 'green' : colors.red}}>
          {verified ? 'Verified' : 'Not verified'}
        </Description>
      </TouchableOpacity>
    </View>
  );
};
