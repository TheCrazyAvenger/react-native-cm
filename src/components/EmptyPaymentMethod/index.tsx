import {EmptyPaymentMethodProps} from '@components';
import {Screens} from '@constants';
import {useNavigation} from '@react-navigation/core';
import {SubtitleMedium} from '@Typography';
import {TextButton} from '@ui';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

export const EmptyPaymentMethod: React.FC<EmptyPaymentMethodProps> = ({
  title,
  type,
  onPress,
}) => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.container}>
      <SubtitleMedium style={styles.title}>Account</SubtitleMedium>
      <TextButton
        titleStyle={{fontFamily: 'OpenSans-SemiBold'}}
        style={{
          paddingHorizontal: 50,
        }}
        title={title}
        onPress={
          onPress
            ? onPress
            : () =>
                navigation.navigate(Screens.paymentMethodsSetUp, {
                  type,
                })
        }
      />
    </View>
  );
};
