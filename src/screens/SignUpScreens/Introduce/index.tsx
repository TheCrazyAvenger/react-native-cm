import React from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Description, Title} from '../../../components/Typography';
import {IntroduceForm} from '../../../forms';
import {Screen} from '../../../ui';
import {styles} from './styles';

export const Introduce: React.FC = () => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={{flex: 1}}>
        <Screen type="View">
          <View style={styles.header}>
            <Title style={{marginBottom: 25}}>Introduce Yourself</Title>
            <Description>
              Please enter your legal first and last name.
            </Description>
          </View>
          <IntroduceForm />
        </Screen>
      </View>
    </KeyboardAvoidingView>
  );
};
