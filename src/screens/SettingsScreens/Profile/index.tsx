import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {LegalAddressForm, ProfileForm} from '../../../forms';
import {useAppDispatch, useAppSelector} from '@hooks';
import {changeName, setAdress} from '@store/slices/authSlice';
import {Screen} from '@ui';
import database from '@react-native-firebase/database';

export const Profile: React.FC = () => {
  const navigation: any = useNavigation();

  const token = useAppSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const saveChanges = async (values: {[key: string]: any}) => {
    try {
      setLoading(true);
      const {
        legalStreetAdress,
        legalCity,
        legalState,
        legalCode,
        shippingStreetAdress,
        shippingCity,
        shippingState,
        shippingCode,
      } = values;

      const legalAdress = {
        streetAdress: legalStreetAdress,
        city: legalCity,
        state: legalState,
        postalCode: legalCode,
      };

      const shippingAdress = {
        streetAdress: shippingStreetAdress,
        city: shippingCity,
        state: shippingState,
        postalCode: shippingCode,
      };

      await database()
        .ref(`/users/${token}`)
        .update({legalAdress, shippingAdress});

      await dispatch(setAdress({legalAdress, shippingAdress}));
      await setLoading(false);
      navigation.pop();
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  return (
    <Screen style={{paddingHorizontal: 16}}>
      <ProfileForm />
      <LegalAddressForm loading={loading} onSubmit={saveChanges} />
    </Screen>
  );
};
