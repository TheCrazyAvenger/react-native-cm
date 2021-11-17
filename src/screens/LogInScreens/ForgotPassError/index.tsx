import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {StatusBar, View, Image, ScrollView} from 'react-native';
import {Notification} from '../../../components';
import {Description, Title} from '../../../components/Typography';
import {Screens} from '../../../constants';
import {Screen, TextButton} from '../../../ui';
import {styles} from './styles';

export const ForgotPassError: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const navigation: any = useNavigation();

  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Notification
        text="A password reset email has been resent."
        visible={showMessage}
        onPress={() => setShowMessage(false)}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Title style={{marginBottom: 8, textAlign: 'center'}}>
              Reset Password Link Expired
            </Title>
            <Description style={{marginBottom: 20, textAlign: 'center'}}>
              Your reset password link has expired. Please click “Resend Email”
              below to receive another email.
            </Description>
            <Image
              source={require('../../../assets/images/register/error.png')}
            />
          </View>
        </ScrollView>
      </View>
      <View style={{marginBottom: 25}}>
        <TextButton
          title="Resend Email"
          solid
          style={{marginBottom: 20}}
          onPress={() => setShowMessage(true)}
        />
        <TextButton
          title="Go to Log in Page"
          onPress={() => navigation.navigate(Screens.logIn)}
        />
      </View>
    </Screen>
  );
};
