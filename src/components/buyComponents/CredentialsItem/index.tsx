import React from 'react';
import {View} from 'react-native';
import {CredentialsItemProps, Wrapper} from '../..';
import {SubtitleMedium} from '@Typography';
import {styles} from './styles';
import {colors} from '@constants';
import {cmCredentials} from '@utilities';

export const CredentialsItem: React.FC<CredentialsItemProps> = ({
  title,
  value,
  id,
}) => {
  return (
    <View>
      <View style={styles.container}>
        <SubtitleMedium style={{color: colors.gray}}>{title}</SubtitleMedium>
        <SubtitleMedium style={{width: '41%', textAlign: 'right'}}>
          {value}
        </SubtitleMedium>
      </View>
      {id !== cmCredentials.length - 1 ? (
        <Wrapper
          style={{backgroundColor: colors.primary, marginVertical: 16}}
        />
      ) : (
        <View style={{marginBottom: 20}} />
      )}
    </View>
  );
};
