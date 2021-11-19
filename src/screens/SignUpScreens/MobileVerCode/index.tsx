import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Description, Title} from '../../../components/Typography';
import {MobileVerCodeForm} from '../../../forms';
import {Screen} from '../../../ui';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import {useRoute} from '@react-navigation/core';

export const MobileVerCode: React.FC = () => {
  const route: any = useRoute();
  console.log(route.params);
  const {mobile} = route.params!.values;
  console.log(mobile);

  useEffect(() => {
    signUpWithCode();
  }, []);

  const signUpWithCode = async () => {
    try {
      await auth().signInWithPhoneNumber(mobile);
    } catch (e) {
      console.log(e);
    }
  };

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
