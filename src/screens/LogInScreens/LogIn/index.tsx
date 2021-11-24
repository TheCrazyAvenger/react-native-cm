import React from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {SocialBlock} from '../../../components';
import {Title} from '../../../components/Typography';
import {LogInForm} from '../../../forms';
import {Screen} from '../../../ui';
import {styles} from './styles';

export const LogIn: React.FC = () => {
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
          <Title style={{marginBottom: 15}}>Log in</Title>
        </View>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <LogInForm />
          <SocialBlock
            style={{marginHorizontal: 10, marginTop: 32, marginBottom: 25}}
          />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};
