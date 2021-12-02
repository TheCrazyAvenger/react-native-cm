import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StatusBar, View, Image} from 'react-native';
import {Title} from '@Typography';
import {Screens} from '@constants';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';

export const ForgotPassDone: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Title style={{marginBottom: 20, textAlign: 'center'}}>
            You have successfully changed your password!
          </Title>

          <Image source={require('@assets/images/register/complete.png')} />
        </View>
        <View style={{marginVertical: 25}}>
          <TextButton
            title="Log in"
            solid
            style={{marginBottom: 20}}
            onPress={() => navigation.navigate(Screens.logIn)}
          />
          <TextButton
            title="Go to Main in Page"
            onPress={() => navigation.navigate(Screens.welcome)}
          />
        </View>
      </View>
    </Screen>
  );
};
