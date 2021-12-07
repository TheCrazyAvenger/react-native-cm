import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import {Description, Title} from '@Typography';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authSucces, setLoading} from '@store/slices/authSlice';
import {useAppDispatch} from '@hooks';

export const MobileVerSuccess: React.FC = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  console.log(route.params.values);

  const goToNext = async () => {
    dispatch(setLoading(true));
    const {email, mobile, password, firstName, lastName} = route.params.values;

    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async data => {
        const {uid, email} = data.user;
        database()
          .ref('users/' + uid)
          .set({
            cashBalance: 0,
            firstName: firstName,
            lastName: lastName,
            userEmail: email,
            mobile: mobile,
            verified: false,
            password: password,
            token: uid,
            legalAdress: {
              streetAdress: null,
              city: null,
              state: null,
              postalCode: null,
            },
            shippingAdress: {
              streetAdress: null,
              city: null,
              state: null,
              postalCode: null,
            },
            ownedMetals: {
              Gold: 0,
              Silver: 0,
              Palladium: 0,
              Platinum: 0,
            },
          });

        await AsyncStorage.setItem('token', JSON.stringify(uid));

        await dispatch(
          authSucces({
            userEmail: email,
            token: uid,
            verified: false,
            firstName,
            lastName,
            password,
            mobile,
            cashBalance: 1000,
            legalAdress: {
              streetAdress: null,
              city: null,
              state: null,
              postalCode: null,
            },
            shippingAdress: {
              streetAdress: null,
              city: null,
              state: null,
              postalCode: null,
            },
            ownedMetals: {
              Gold: 0,
              Silver: 0,
              Palladium: 0,
              Platinum: 0,
            },
          }),
        );

        dispatch(setLoading(false));
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);

        dispatch(setLoading(false));
      });
  };

  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={styles.header}>
            <Title style={styles.title}>Mobile Verification Complete</Title>
            <Description style={styles.description}>
              Thank you for opening a CyberMetals account!
            </Description>
          </View>
          <Image
            style={{alignSelf: 'center'}}
            source={require('../../../assets/images/register/complete.png')}
          />
        </ScrollView>

        <TextButton
          title="Go To Dashboard"
          onPress={goToNext}
          solid
          style={{marginVertical: 25}}
        />
      </View>
    </Screen>
  );
};
