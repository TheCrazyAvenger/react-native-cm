import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import {Description, Title} from '@Typography';
import {PasswordForm} from '../../../forms';
import {Screen} from '@ui';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {useAppDispatch, useAppSelector} from '@hooks';
import {setLoading} from '@store/slices/authSlice';
import {getData} from '@store/actions';
import {LoadingItem} from '@components';

export const Password: React.FC = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();

  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.auth.loading);
  const token = useAppSelector(state => state.auth.token);

  const {type} = route.params;

  const changePassword = async (password: any) => {
    try {
      dispatch(setLoading(true));

      await auth().currentUser!.updatePassword(password);
      await database().ref(`/users/${token}`).update({password});

      await dispatch(getData());
      await dispatch(setLoading(false));

      navigation.pop();
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Screen type="View">
        {type !== 'Change' && (
          <View style={styles.header}>
            {type === 'SignIn' ? (
              <Title style={{marginBottom: 25}}>Create New Password</Title>
            ) : (
              <Title style={{marginBottom: 25}}>Set Your Password</Title>
            )}
            {type === 'SignIn' ? (
              <Description>
                Your new password cannot be the same as a previously-used
                password.
              </Description>
            ) : (
              <Description>
                Your password should include at least one upper and lowercase
                character, a number, and special character.
              </Description>
            )}
          </View>
        )}
        <PasswordForm changePassword={changePassword} />
      </Screen>
    </KeyboardAvoidingView>
  );
};
