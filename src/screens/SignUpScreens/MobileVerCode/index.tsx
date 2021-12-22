import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Description, Title} from '@Typography';
import {MobileVerCodeForm} from '../../../forms';
import {Screen} from '@ui';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import {useRoute} from '@react-navigation/core';
import {Notification} from '@components';

export const MobileVerCode: React.FC = () => {
  const route: any = useRoute();

  const [modal, setModal] = useState(true);

  // const {mobile} = route.params!.values;

  // useEffect(() => {
  //   signUpWithCode();
  // }, []);

  // const signUpWithCode = async () => {
  //   try {
  //     await auth().signInWithPhoneNumber(mobile);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Notification
        visible={modal}
        onPress={() => setModal(false)}
        text="Your verification code has been sent to your mobile number."
      />
      <Screen type="View">
        <View style={styles.header}>
          <Title style={{marginBottom: 25}}>Mobile Verification</Title>
          <Description>
            Please enter the code you received from the text message here.
          </Description>
        </View>
        <MobileVerCodeForm showNotify={() => setModal(true)} />
      </Screen>
    </KeyboardAvoidingView>
  );
};
