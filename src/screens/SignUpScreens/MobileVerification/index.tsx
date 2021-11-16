import React from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Description, Title} from '../../../components/Typography';
import {MobileVerForm} from '../../../forms';
import {Screen} from '../../../ui';
import {styles} from './styles';

export const MobileVerification: React.FC = () => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Screen>
        <View style={styles.header}>
          <Title style={{marginBottom: 25}}>Mobile Verification</Title>
          <Description>
            For an added layer of security, we require customers to set
            up Two-Factor Authentication (2FA). You will be required to enter
            a verification code that is sent to your mobile phone each time you
            log into CyberMetals.
          </Description>
        </View>
        <MobileVerForm />
      </Screen>
    </KeyboardAvoidingView>
  );
};
