import {useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {SocialButton} from '@ui';
import {useAppSelector} from '@hooks';

export const PayPalForm: React.FC<{
  onSubmit: (...args: any) => void;
  type: string;
  label: string;
}> = ({onSubmit, type, label}) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);

  return (
    <View style={styles.container}>
      <SocialButton
        imageUri={require('@assets/images/settings/paymentMethods/paypalButton.png')}
        onPress={() =>
          onSubmit({
            paymentMethod: type,
            cardNumber: `${firstName}.${lastName}@work.com`,
            label,
          })
        }
        style={styles.button}
        borderColor="#F6C657"
      />
    </View>
  );
};
