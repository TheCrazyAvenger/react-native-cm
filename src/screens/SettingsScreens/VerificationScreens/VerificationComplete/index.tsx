import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {VerificationComplete as VerComplete} from '@assets/images/settings';
import {Subtitle, SubtitleMedium} from '@Typography';
import {Screens} from '@constants';
import {useAppDispatch, useAppSelector} from '@hooks';
import {setVerified} from '@store/slices/authSlice';
import {Screen, TextButton} from '@ui';
import database from '@react-native-firebase/database';
import {styles} from './styles';
import {LoadingItem} from '@components';

export const VerificationComplete: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();

  const token = useAppSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const values = route.params?.values;

  const goToSettings = async () => {
    try {
      setLoading(true);
      await AsyncStorage.setItem('verified', JSON.stringify(true));

      await database()
        .ref('users/' + token)
        .update({verified: true});

      await dispatch(setVerified(true));
      await setLoading(false);

      navigation.navigate(Screens.settings);
    } catch (e) {
      await setLoading(false);
      console.log(e);
    }
  };

  if (loading) {
    return <LoadingItem />;
  }

  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <VerComplete />
            <Subtitle style={styles.title}>Submitted for Verification</Subtitle>

            <SubtitleMedium style={styles.description}>
              Thank you for submitting your document. Ypur application is
              currently under review. Our team will begin your application
              review as soon as possible. We will notify you when we have
              completed the verification process.
            </SubtitleMedium>
          </View>
        </ScrollView>
        <TextButton
          title="Back to Settings"
          loading={loading}
          disabled={loading}
          style={{marginBottom: 25}}
          solid
          onPress={goToSettings}
        />
      </View>
    </Screen>
  );
};
