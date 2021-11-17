import {useRoute} from '@react-navigation/native';
import React from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Description, Title} from '../../../components/Typography';
import {PasswordForm} from '../../../forms';
import {Screen} from '../../../ui';
import {styles} from './styles';

export const Password: React.FC = () => {
  const route: any = useRoute();

  const {type} = route.params;
  console.log(type);

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
          {type === 'SignIn' ? (
            <Title style={{marginBottom: 25}}>Create New Password</Title>
          ) : (
            <Title style={{marginBottom: 25}}>Set Your Password</Title>
          )}
          {type === 'SignIn' ? (
            <Description>
              Your new password cannot be the same as a previously-used
              password.
            </Description>
          ) : (
            <Description>
              Your password should include at least one upper and lowercase
              character, a number, and special character.
            </Description>
          )}
        </View>
        <PasswordForm />
      </Screen>
    </KeyboardAvoidingView>
  );
};
