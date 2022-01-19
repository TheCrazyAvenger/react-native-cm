import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Description, Title} from '@Typography';
import {MobileVerCodeForm} from '../../../forms';
import {Screen} from '@ui';
import {styles} from './styles';
import {Notification} from '@components';

export const MobileVerCode: React.FC = () => {
  const [modal, setModal] = useState(true);

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
