import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ProfileForm} from '../../../forms';
import {useAppDispatch, useAppSelector} from '@hooks';
import {changeName, setLoading} from '@store/slices/authSlice';
import {Screen} from '@ui';
import database from '@react-native-firebase/database';
import {LoadingItem} from '@components';

export const Profile: React.FC = () => {
  const navigation: any = useNavigation();

  const token = useAppSelector(state => state.auth.token);
  const loading = useAppSelector(state => state.auth.loading);

  const dispatch = useAppDispatch();

  const saveChanges = async (values: {[key: string]: any}) => {
    dispatch(setLoading(true));
    const {firstName, lastName} = values;

    await database().ref(`/users/${token}`).update({firstName, lastName});
    await dispatch(changeName({firstName, lastName}));
    await dispatch(setLoading(false));
    navigation.pop();
  };
  if (loading) {
    return <LoadingItem />;
  }

  return (
    <Screen type="View">
      <ProfileForm onSubmit={saveChanges} />
    </Screen>
  );
};
