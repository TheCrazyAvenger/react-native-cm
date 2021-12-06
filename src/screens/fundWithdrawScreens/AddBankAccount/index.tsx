import {Screens} from '@constants';
import {useNavigation} from '@react-navigation/core';
import {Description, SubtitleMedium} from '@Typography';
import {Screen, TextButton} from '@ui';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from './styles';

export const AddBankAccount: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <Screen type="View" style={styles.container}>
      <ScrollView>
        <SubtitleMedium style={styles.title}>
          Log in (Plaid) to your online Checking account for instant
          verification. We strongly encourage you to only link a Checking
          account, as linking a Savings account may result in processing delays
          and/or fees from your bank.
        </SubtitleMedium>
        <Description style={styles.description}>
          CyberMetals uses Plaid to securely link to your bank account. When you
          log into Plaid, we receive Identifiers, Contact Information, Financial
          Information, and Technical Information from Plaid, which we use,
          process, and store as described in our Privacy Policy.
        </Description>
      </ScrollView>
      <View style={styles.buttons}>
        <TextButton
          solid
          title="Log In to Your Online
Checking Account"
          onPress={() =>
            navigation.navigate(Screens.paymentMethodsSetUp, {type: 'eCheck'})
          }
        />
        <TextButton
          style={{marginTop: 20}}
          title="Cancel"
          onPress={() => navigation.goBack()}
        />
      </View>
    </Screen>
  );
};
