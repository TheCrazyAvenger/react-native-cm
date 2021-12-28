import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {SocialBlock} from '@components';
import {Title} from '@Typography';
import {LogInForm} from '../../../forms';
import {Screen} from '@ui';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import {useAppDispatch} from '@hooks';
import {Error} from '@Typography';
import {useNavigation} from '@react-navigation/core';
import {Screens} from '@constants';

export const LogIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();

  const authHandler = async (values: any) => {
    try {
      setError(null);
      setLoading(true);
      console.log(values);
      const {email: userEmail, password} = values;
      await auth()
        .signInWithEmailAndPassword(userEmail, password)
        .then(async data => {
          setLoading(false);

          navigation.navigate(Screens.mobileVerCode, {
            type: 'SignIn',
            token: data.user.uid.toString(),
          });
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            setLoading(false);
            return setError(
              'The email address or password does not match any account. Please try again.',
            );
          }
          setError(error.message);
          console.log(error);
          setLoading(false);
        });
    } catch (e) {
      console.log(e);
    }
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
          {error && (
            <Error style={{marginHorizontal: 10, marginBottom: 16}}>
              {error}
            </Error>
          )}

          <LogInForm loading={loading} onSubmit={authHandler} />
          <SocialBlock
            style={{marginHorizontal: 10, marginTop: 32, marginBottom: 25}}
          />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};
