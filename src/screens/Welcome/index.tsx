import React from 'react';
import {Image, View} from 'react-native';
import {SocialBlock} from '../../components';
import {Subtitle, Title} from '../../components/Typography';
import {TextButton} from '../../ui';
import {Screen} from '../../ui/Screen';
import {styles} from './styles';

export const Welcome: React.FC = () => {
  return (
    <Screen>
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
        <TextButton title="Create New Account" onPress={() => console.log(1)} />
      </View>
      <SocialBlock />
    </Screen>
  );
};
