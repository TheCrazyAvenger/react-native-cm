import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {Notification} from '@components';
import {Description, Illustration, Title, Error} from '@Typography';
import {Screens} from '@constants';
import {Screen, TextButton} from '@ui';
import {styles} from './styles';
import auth from '@react-native-firebase/auth';

const BUNDLE_ID = 'com.cybermetals';

const actionCodeSettings = {
  handleCodeInApp: true,
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

  const changeEmail = () => {
    navigation.push(Screens.email, {
      type: 'change',
      values: {...values},
    });
  };

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  useEffect(() => {
    sendEmail();
  }, []);

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

  const resentEmail = () => {
    sendEmail();
    setShowNotify(true);
    setMinutes(1);
  };

  useEffect(() => {
    if (next === true)
      navigation.push(Screens.emailVerSuccess, {
        values: {...route.params.values},
      });
  }, [next]);

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
              Please wait 1 minute before clicking Resend Email ({minutes}:
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
