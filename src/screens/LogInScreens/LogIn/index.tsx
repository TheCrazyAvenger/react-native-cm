import React from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {SocialBlock} from '../../../components';
import {Title} from '../../../components/Typography';
import {LogInForm} from '../../../forms';
import {Screen} from '../../../ui';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {getData} from '../../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setLoading} from '../../../store/slices/authSlice';

export const LogIn: React.FC = () => {
  const loading = useAppSelector(state => state.auth.loading);
  const dispatch = useAppDispatch();

  const authHandler = async (values: any) => {
    dispatch(setLoading(true));
    const {email: userEmail, password} = values;
    await auth()
      .signInWithEmailAndPassword(userEmail, password)
      .then(async data => {
        await AsyncStorage.setItem('token', JSON.stringify(data.user.uid));
      })
      .catch(error => {
        console.error(error);
      });
    await dispatch(getData());
    dispatch(setLoading(false));
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
      <Screen>
        <View style={styles.header}>
          <Title style={{marginBottom: 15}}>Log in</Title>
        </View>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <LogInForm onSubmit={authHandler} />
          <SocialBlock
            style={{marginHorizontal: 10, marginTop: 32, marginBottom: 25}}
          />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};
