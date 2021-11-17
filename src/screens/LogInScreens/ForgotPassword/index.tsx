import React from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Description, Title} from '../../../components/Typography';
import {ForgotPassForm} from '../../../forms';
import {Screen} from '../../../ui';
import {styles} from './styles';

export const ForgotPassword: React.FC = () => {
  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <Title style={{marginBottom: 8}}>Forgot Password</Title>
        <Description style={{marginBottom: 20}}>
          Enter the email associated with your account to receive a secure
          password reset link.
        </Description>
        <Description>
          If you do not receive the email, first verify if it was sent to a spam
          or junk folder. If you still haven’t received it, please review the
          email address entered for accuracy and resubmit your request. For
          further assistance, contact us at 
          <Description style={styles.email}>
            support@cybermetals.com.
          </Description>
        </Description>
      </View>

      <ForgotPassForm />
    </Screen>
  );
};
