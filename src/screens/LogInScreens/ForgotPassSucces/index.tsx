import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StatusBar, View, Image, ScrollView} from 'react-native';
import {Description, Title} from '@Typography';
import {Screens} from '@constants';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import Share from 'react-native-share';

export const ForgotPassSucces: React.FC = () => {
  const navigation: any = useNavigation();

  const onShare = () => {
    const shareOptions: any = {
      social: Share.Social.EMAIL,
    };

    Share.shareSingle(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <ScrollView>
        <View style={styles.header}>
          <Title style={{marginBottom: 8, textAlign: 'center'}}>
            Password Reset Email Sent
          </Title>
          <Description style={{marginBottom: 20, textAlign: 'center'}}>
            A password reset email has been sent. If you do not receive the
            email, first verify if it is in a spam or junk folder.
          </Description>
          <Description style={{marginBottom: 20, textAlign: 'center'}}>
            If you still have not received it, please review the email address
            for accuracy and resubmit your request. For further assistance,
            contact us at{' '}
            <Description onPress={onShare} style={styles.email}>
              support@cybermetals.com.
            </Description>
          </Description>
          <Image source={require('@assets/images/register/complete.png')} />
        </View>
      </ScrollView>

      <View style={{marginBottom: 25}}>
        <TextButton
          title="Go to Main Page"
          solid
          style={{marginVertical: 25}}
          onPress={() => navigation.navigate(Screens.welcome)}
        />
        {/* <TextButton
          title="Go to Error Page(Dev)"
          onPress={() => navigation.navigate(Screens.forgotPassError)}
        />
        <TextButton
          title="Go to Create new password Page(Dev)"
          onPress={() =>
            navigation.navigate(Screens.password, {
              type: 'SignIn',
            })
          }
        /> */}
      </View>
    </Screen>
  );
};
