import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import {LogoWhiteBlue} from '../../assets/images';
import {SocialBlock} from '../../components';
import {Title} from '../../components/Typography';
import {Screens} from '../../constants';
import {TextButton} from '../../ui';
import {Screen} from '../../ui/Screen';
import {styles} from './styles';

export const Welcome: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <Screen style={{paddingHorizontal: 36}}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <LogoWhiteBlue />
        <Title style={{marginTop: 16}}>Welcome to CyberMetals</Title>
      </View>
      <View style={styles.authButtons}>
        <TextButton
          title="Log in"
          style={{marginBottom: 20}}
          solid
          onPress={() => navigation.navigate(Screens.signIn)}
        />
        <TextButton
          title="Create New Account"
          onPress={() => navigation.navigate(Screens.signUp)}
        />
      </View>
      <SocialBlock />
    </Screen>
  );
};
