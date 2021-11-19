import React from 'react';
import {View} from 'react-native';
import {colors} from '../../../constants';
import {useAppSelector} from '../../../hooks/hooks';
import {Description, TitleMedium} from '../../Typography';
import {styles} from './styles';

export const SettingsHeader: React.FC = () => {
  const email = useAppSelector(state => state.auth.userEmail);

  return (
    <View style={styles.container}>
      <View>
        <TitleMedium style={styles.userName}>Danny Mock</TitleMedium>
        <Description style={{color: colors.primary}}>{email}</Description>
      </View>
      <View style={styles.verified}>
        <Description style={{color: 'green'}}>Verified</Description>
      </View>
    </View>
  );
};
