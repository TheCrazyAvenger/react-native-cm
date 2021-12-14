import {useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {SocialButton} from '@ui';
import {useAppSelector} from '@hooks';
import {SubtitleMedium} from '@Typography';
import {LoadingItem} from '@components';

export const PayPalForm: React.FC<{
  onSubmit: (...args: any) => void;
  type: string;
  label: string;
  style?: {[key: string]: number | string};
  labelStyle?: {[key: string]: number | string};
  screen?: string;
}> = ({onSubmit, type, label, style, labelStyle, screen}) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);

  const loading = useAppSelector(state => state.auth.loading);

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <View style={{...styles.container, ...style}}>
      {screen === 'Buy' && (
        <SubtitleMedium style={styles.title}>Account</SubtitleMedium>
      )}
      <SocialButton
        imageUri={require('@assets/images/settings/paymentMethods/paypalButton.png')}
        onPress={() =>
          onSubmit({
            paymentMethod: type,
            cardNumber: `${firstName}.${lastName}${
              Math.round(Math.random() * (9999 - 1000 + 1)) + 1000
            }@work.com`,
            label,
          })
        }
        style={{...styles.button, ...labelStyle}}
        borderColor="#F6C657"
      />
    </View>
  );
};
