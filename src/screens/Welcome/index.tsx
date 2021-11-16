import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import {SocialBlock} from '../../components';
import {Title} from '../../components/Typography';
import {Screens} from '../../constants';
import {TextButton} from '../../ui';
import {Screen} from '../../ui/Screen';
import {styles} from './styles';

export const Welcome: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <Screen>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo_white_blue.png')} />
        <Title style={{marginTop: 16}}>Welcome to CyberMetals</Title>
      </View>
      <View style={styles.authButtons}>
        <TextButton
          title="Log in"
          style={{marginBottom: 20}}
          solid
          onPress={() => console.log(1)}
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
