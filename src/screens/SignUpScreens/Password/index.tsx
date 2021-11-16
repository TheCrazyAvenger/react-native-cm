import React from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Description, Title} from '../../../components/Typography';
import {PasswordForm} from '../../../forms';
import {Screen} from '../../../ui';
import {styles} from './styles';

export const Password: React.FC = () => {
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
          <Title style={{marginBottom: 25}}>Set Your Password</Title>
          <Description>
            Your password should include at least one upper and lowercase
            character, a number, and special character.
          </Description>
        </View>
        <PasswordForm />
      </Screen>
    </KeyboardAvoidingView>
  );
};
