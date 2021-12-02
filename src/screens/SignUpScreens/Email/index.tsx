import React from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Description, Title} from '@Typography';
import {EmailForm} from '../../../forms';
import {Screen} from '@ui';
import {styles} from './styles';

export const Email: React.FC = () => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />

      <Screen type="View">
        <View style={styles.header}>
          <Title style={{marginBottom: 25}}>Email Address</Title>
          <Description>
            Please enter your email address. This will be used for logging in,
            account verifications and confirmations.
          </Description>
        </View>
        <EmailForm />
      </Screen>
    </KeyboardAvoidingView>
  );
};
