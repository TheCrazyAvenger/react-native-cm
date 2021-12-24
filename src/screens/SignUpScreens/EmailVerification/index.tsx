import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {Notification} from '@components';
import {Description, Illustration, Title, Error} from '@Typography';
import {Screens} from '@constants';
import {useAppDispatch} from '@hooks';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';

const BUNDLE_ID = 'com.cybermetals';

const actionCodeSettings = {
  handleCodeInApp: true,
  // URL must be whitelisted in the Firebase Console.
  url: 'https://cybermetals.page.link/qL6j',
  iOS: {
    bundleId: BUNDLE_ID,
  },
  android: {
    packageName: BUNDLE_ID,
    installApp: true,
    minimumVersion: '12',
  },
};

export const EmailVerification: React.FC = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const [showNotify, setShowNotify] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [next, setNext] = useState(false);

  const values = route.params.values;
  const dispatch = useAppDispatch();

  const changeEmail = () => {
    navigation.push(Screens.email, {
      type: 'change',
      values: {...values},
    });
  };

  const goToError = () => {
    navigation.push(Screens.emailVerError, {
      values: {...route.params.values},
    });
  };

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    sendEmail();
  }, []);

  useEffect(() => {
    if (next === true)
      navigation.push(Screens.emailVerSuccess, {
        values: {...route.params.values},
      });
  }, [next]);

  const sendEmail = async () => {
    try {
      setNext(false);
      await auth().sendSignInLinkToEmail(values.email, actionCodeSettings);
      setNext(true);
    } catch (e: any) {
      setError(e.message);
      console.log(e);
    }
  };

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    }
  }, [seconds]);

  const resentEmail = () => {
    sendEmail();
    setShowNotify(true);
    setSeconds(59);
  };

  return (
    <Screen type="View">
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={'transparent'}
      />
      <Notification
        text="An account verification email has been resent."
        visible={showNotify}
        onPress={() => setShowNotify(false)}
      />

      <View style={{flex: 1}}>
        <ScrollView style={styles.header}>
          <Title style={{marginBottom: 25}}>Email Verification</Title>
          <Description>
            You will receive an account verification email shortly. Please
            follow the instructions in the email to complete the registration
            process.
          </Description>
          {error && <Error style={{marginTop: 10}}>{error}</Error>}
        </ScrollView>
        <View style={styles.buttons}>
          {seconds > 0 ? (
            <Illustration style={styles.resendTimer}>
              Please wait 1 minute before clicking Resend Email (0:
              {`${seconds < 10 ? '0' : ''}${seconds}`})
            </Illustration>
          ) : null}
          <TextButton
            title="Resend Email"
            onPress={resentEmail}
            disabled={seconds > 0 ? true : false}
            solid
            style={{marginBottom: 20}}
          />

          <TextButton title="Use Another Email" onPress={changeEmail} />
        </View>
      </View>
    </Screen>
  );
};
