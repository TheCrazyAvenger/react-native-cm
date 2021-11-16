import React from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Description, Title} from '../../../components/Typography';
import {MobileVerCodeForm} from '../../../forms';
import {Screen} from '../../../ui';
import {styles} from './styles';

export const MobileVerCode: React.FC = () => {
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
            Please enter the code you received from the text message here.
          </Description>
        </View>
        <MobileVerCodeForm />
      </Screen>
    </KeyboardAvoidingView>
  );
};
