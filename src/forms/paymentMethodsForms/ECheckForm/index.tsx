import {useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import {SocialButton, TextButton} from '@ui';
import {useAppSelector} from '@hooks';
import {Description, SubtitleMedium} from '@Typography';
import {colors} from '@constants';

export const ECheckForm: React.FC<{
  onSubmit: (...args: any) => void;
  type: string;
  label: string;
  loading: boolean;
}> = ({onSubmit, type, label, loading}) => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SubtitleMedium style={{marginBottom: 20}}>
          Log in (Plaid) to your online Checking account for instant
          verification. We strongly encourage you to only link a Checking
          account, as linking a Savings account may result in processing delays
          and/or fees from your bank.
        </SubtitleMedium>
        <Description style={{color: colors.gray}}>
          CyberMetals uses Plaid to securely link to your bank account. When you
          log into Plaid, we receive Identifiers, Contact Information, Financial
          Information, and Technical Information from Plaid, which we use,
          process, and store as described in our Privacy Policy.
        </Description>
      </ScrollView>
      <View style={styles.buttons}>
        <TextButton
          solid
          loading={loading}
          disabled={loading}
          onPress={() =>
            onSubmit({
              paymentMethod: type,
              name: `CHASE`,
              accountNumber: `${Math.round(
                Math.random() * (9999 - 1000 + 1) + 1000,
              )}`,
              accountType:
                Math.round(Math.random() * (10 + 1)) > 5
                  ? 'CHECKING ACCOUNT'
                  : 'SAVING ACCOUNT',
              label,
            })
          }
          title="Log In to Your Online
          Checking Account"
          style={styles.button}
        />
        <TextButton onPress={() => navigation.pop()} title="Cancel" />
      </View>
    </View>
  );
};
