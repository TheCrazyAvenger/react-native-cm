import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, ScrollView, StatusBar, View} from 'react-native';
import {Description, Error, Title} from '@Typography';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authSucces, setLoading} from '@store/slices/authSlice';
import {useAppDispatch} from '@hooks';
import {LoadingItem} from '@components';

export const MobileVerSuccess: React.FC = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const goToNext = async () => {
    const {email, mobile, password, firstName, lastName} = route.params.values;
    setLoading(true);
    setError(null);
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
              streetAdress: '',
              city: '',
              state: '',
              postalCode: '',
            },
            shippingAdress: {
              streetAdress: '',
              city: '',
              state: '',
              postalCode: '',
            },
            ownedMetals: {
              Gold: 0,
              Silver: 0,
              Palladium: 0,
              Platinum: 0,
            },
            loginMethods: {
              touchId: false,
              faceId: false,
              passcode: null,
            },
          });

        await AsyncStorage.setItem('token', JSON.stringify(uid));

        setLoading(false);
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
            loginMethods: {
              touchId: null,
              faceId: null,
              passcode: null,
            },
            notifications: {
              transactions: false,
              promotions: false,
              marketNews: false,
            },
          }),
        );
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setLoading(false);
          return setError('That email address is already in use!');
        }
        setError(error);
        setLoading(false);
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

        {error && <Error style={{alignSelf: 'center'}}>{error}</Error>}

        <TextButton
          title="Go To Dashboard"
          onPress={goToNext}
          solid
          loading={loading}
          disabled={loading}
          style={{marginVertical: 25}}
        />
      </View>
    </Screen>
  );
};
